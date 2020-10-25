import sqlite3
from flask_restful import Resource, reqparse
from flask import Flask, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt import jwt_required


class User:
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(cls, username):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT id, username, password FROM users WHERE username =?"
        result = cursor.execute(query, (username,))
        row = result.fetchone()
        if row:
            user = cls(*row)
            print(user)
        else:
            user = None

        connection.close()
        return user

    @classmethod
    def find_by_id(cls, id):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT id, username, password FROM users WHERE id =?"
        result = cursor.execute(query, (id,))
        row = result.fetchone()
        if row:
            user = cls(*row)
        else:
            user = None

        connection.close()
        return user

class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('username',
        type=str,
        required=True,
        help= "This field cannot be blank"
    )
    parser.add_argument('password',
        type=str,
        required=True,
        help= "This field cannot be blank"
    )
    def post(self):
        data = UserRegister.parser.parse_args()

        username = data['username']
        password = data['password']
        if(len(username) > 4 and len(password) >=6):
            if User.find_by_username(data['username']):
                return {"message": "A user with that username already exists"}, 400
            else:
                connection = sqlite3.connect('data.db')
                cursor = connection.cursor()

                query = "INSERT INTO users VALUES (NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)"
                cursor.execute(query, (username, generate_password_hash(password)))

                connection.commit()
                connection.close()

                return {'message': "User created successfully."}, 200

        return {'message': 'Has mistake'}
          
class UserInformation(Resource):
    @jwt_required()
    def get(self, username):
        user_info = self.find_by_username(username)
        if user_info:
            return user_info

    @classmethod
    def find_by_username(cls, username):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM users WHERE username =?"
        result = cursor.execute(query, (username,))
        row = result.fetchone()
        if row:
            user = {'id': row[0], 'username': row[1], 'password': row[2], 'last_name': row[3]}
        else:
            user = None

        connection.close()
        return user

    def put(self, username):
        data = request.get_json()

        user_info = self.find_by_username(username)
        update_info = {'username': username, 'last_name': data['last_name'], 'first_name': data['first_name'], 'dob': data['dob'], 'gender': data['gender'], 'occupation': data['occupation'], 'address': data['address'], 'email': data['email'], 'phone_number': data['phone_number']}

        if user_info:
            try:
                self.update(update_info)
            except:
                 return {"message": "An error occured updating"}, 500
            return update_info

    @classmethod
    def update(cls, username):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "UPDATE users SET last_name =?, first_name =?, dob =?, gender =?, occupation =?, address =?, email =?, phone_number =? WHERE username =?"
        cursor.execute(query,(username['last_name'], username['first_name'], username['dob'], username['gender'], username['occupation'], username['address'], username['email'], username['phone_number'], username['username']))

        connection.commit()
        connection.close()

class ForgotPassword(Resource):
    def put(self, username):
        user_info = UserInformation.find_by_username(username)
        print(user_info)
        if user_info:
            data = request.get_json()

            connection = sqlite3.connect('data.db')
            cursor = connection.cursor()
            query = "UPDATE users SET password=? WHERE username =?"
            cursor.execute(query, (generate_password_hash(data['password']), username,))

            connection.commit()
            connection.close()
            return {"message" : "Successfully"}
        
        return {"message": "Not found user"}
        
    
    


