from flask import Flask, request
from flask_restful import Resource
from flask_jwt import jwt_required
import sqlite3



class Participant(Resource):
    @jwt_required()
    #get by id_user
    def get(self, name):
        paritcipant = self.find_by_name(name)
        if paritcipant:
            return paritcipant
        return {'message': 'Paritcipant not found'}, 404

    @classmethod
    def find_by_name(cls, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM participants WHERE id_users=?"
        result = cursor.execute(query, (name,))

        participant = []
        for row in result:
            participant.append({'participant': {'id': row[0], 'id_events': row[1], 'id_users': row[2]}}) 
        
        connection.close()
        return {'participant': participant}

    #post by id_user
    def post(self, name):
        data = request.get_json()

        participant = {'id_users': name, 'id_events': data['id_events']}

        try:
            self.insert(participant)
        except:
            return {"message" : "An error occured inserting"}, 500
        return participant, 201

    @classmethod
    def insert(cls, participant):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "INSERT INTO participants VALUES (NULL, ?, ?)"
        cursor.execute(query, (participant['id_events'], participant['id_users']))

        connection.commit()
        connection.close()

    #delete by id of participants table
    def delete(self, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "DELETE FROM participants WHERE id=?"
        cursor.execute(query, (name,))

        connection.commit()
        connection.close()

        return {'message': 'Participant deleted'}
    
    def put(self, name):
        data = request.get_json()

        participant = self.find_by_id(name)
        update_participant = {'id': name, 'id_events': data['id_events']}
        
        if participant:
            try:
                self.update(update_participant)
            except:
                return {"message": "An error occured updating"},500
            return update_participant

    #update by id of participants table
    @classmethod
    def update(cls, participant):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "UPDATE participants SET id_events=? WHERE id=?"
        cursor.execute(query, (participant['id_events'], participant['id']))

        connection.commit()
        connection.close()

    @classmethod
    def find_by_id(cls, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM participants WHERE id=?"
        result = cursor.execute(query, (name,))
        row = result.fetchone()
        connection.close()
        if row:
            return {'participant': {'participant': {'id': row[0], 'id_events': row[1], 'id_users': row[2]}}}

class ParticipantList(Resource):
    #get all data from participants table
    def get(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM participants"
        result = cursor.execute(query)
        participants = []
        for row in result:
            participants.append({'id': row[0], 'id_events': row[1], 'id_users': row[2]})

        connection.close()

        return {'participants': participants}