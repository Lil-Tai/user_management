from flask import Flask  
from flask_restful import Api
from participants import Participant, ParticipantList


app = Flask(__name__)
api = Api(app)

api.add_resource(Participant, '/participant/<string:name>')
api.add_resource(ParticipantList, '/participants')


if __name__ == '__main__':
    app.run(port=5000, debug=True)