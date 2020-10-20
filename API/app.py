from flask import Flask  
from flask_restful import Api
from participants import Participant, ParticipantList
from flask_jwt import JWT
from security import authenticate, identity
from user import UserRegister, UserInformation, ForgotPassword

app = Flask(__name__)
app.secret_key = "daniel"
api = Api(app)

jwt = JWT(app, authenticate, identity) # /auth

api.add_resource(Participant, '/participant/<string:name>')
api.add_resource(ParticipantList, '/participants')
api.add_resource(UserRegister, '/register')
api.add_resource(UserInformation, '/user/<string:username>')
api.add_resource(ForgotPassword, '/forgot/<string:username>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)