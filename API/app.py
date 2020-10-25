from flask import Flask  
from flask_restful import Api
from participants import Participant, ParticipantList
from flask_jwt import JWT
from security import authenticate, identity
from user import UserRegister, UserInformation, ForgotPassword
from events import Events, EventsId, Count
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)


app = Flask(__name__)
ma = Marshmallow(app)
app.secret_key = "daniel"
api = Api(app)
cors = CORS(app)

jwt = JWT(app, authenticate, identity) # /auth

api.add_resource(Participant, '/participants/<string:name>')
api.add_resource(ParticipantList, '/participants')
api.add_resource(UserRegister, '/register')
api.add_resource(UserInformation, '/user/<string:username>')
api.add_resource(ForgotPassword, '/forgot/<string:username>')
api.add_resource(Events, '/events')
api.add_resource(EventsId, '/events/<id>')
api.add_resource(Count, '/events/count/<id>')
if __name__ == '__main__':
    app.run(port=5000, debug=True)