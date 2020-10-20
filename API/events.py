import sqlite3
from flask_restful import Resource, reqparse
from flask import Flask, request, make_response, jsonify

class Events(Resource):
    def get(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM events"
        result = cursor.execute(query)

        events = []
        for row in result:
            events.append({'id': row[0] , 'event_name': row[1] , 'starting_time': row[2], 
                            'ending_time': row[3] , 'image':row[4] , 'discount_rate':row[5] , 'discount_rules': row[6], 'price': row[7] }) 
        
        connection.close()
        
        return {'events': events}
    
    def post(self):
        data = request.get_json()

        event = {'event_name': data['event_name'], 'starting_time': data['starting_time'], 'ending_time': data['ending_time'], 
                'image':data['image'], 'discount_rate':data['discount_rate'], 'discount_rules': data['discount_rules'], 'price': data['price']}

        try:
            self.insert(event)
        except:
            return {"message" : "An error occured inserting"}, 500
        return event, 201

    @classmethod
    def insert(cls, event):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        print(event['event_name'])
        query = "INSERT INTO events VALUES (NULL,?,?,?,?,?,?,?)"
        cursor.execute(query, (event['event_name'], event['starting_time'],event['ending_time'],event['image'],event['discount_rate'],
                                event['discount_rules'],event['price']))

        connection.commit()
        connection.close()

class EventsId(Resource):
    @classmethod
    def find_by_id(cls, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM events WHERE id=?"
        result = cursor.execute(query, (name,))
        event = result.fetchone()
        connection.close()
        if event:
            return {'event': 'exist'}
    def delete(self, id):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "DELETE FROM events WHERE id=?"
        cursor.execute(query, (id,))

        connection.commit()
        connection.close()

        return {'message': 'Participant deleted'}
    def get(self, id):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM events WHERE id=?"
        result = cursor.execute(query, (id,))
        if result:
            for row in result:
                event = {'id': row[0] , 'event_name': row[1] , 'starting_time': row[2], 
                            'ending_time': row[3] , 'image':row[4] , 'discount_rate':row[5] , 'discount_rules': row[6], 'price': row[7]} 
        
        connection.close()
        return make_response(jsonify({'event': event}))
    
    def put(self, id):
        data = request.get_json()

        event = self.find_by_id(id)
        
        update_event = {'id': id,'event_name': data['event_name'], 'starting_time': data['starting_time'], 'ending_time': data['ending_time'], 
                'image':data['image'], 'discount_rate':data['discount_rate'], 'discount_rules': data['discount_rules'], 'price': data['price']}
        
        if event:
            try:
                self.update(update_event)
            except:
                return {"message": "An error occured updating"},500
            return update_event

    @classmethod
    def update(cls, event):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "UPDATE events SET event_name=?, starting_time=?,ending_time=?,image=?,discount_rate=?, discount_rules=?,price=? WHERE id=?"
        cursor.execute(query, (event['event_name'], event['starting_time'],event['ending_time'],event['image'],event['discount_rate'],
                                event['discount_rules'],event['price'], event['id']))

        connection.commit()
        connection.close()

class Count(Resource):
    def get(self, id):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM participants WHERE id_events = ?;"
        result = cursor.execute(query, (id,))
        count = 0
        for row in result:
            count = count + 1
        connection.commit()
        connection.close()
        return jsonify({'count':count})