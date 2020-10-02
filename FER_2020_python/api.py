# imports
from flask import Flask
from flask_restful import Resource, Api
# api definition
app = Flask(__name__)
api = Api(app)

class PredictEmotion(Resource):
    def get(self):

        pred_text = 'neutral'
        #output definition
        output ={'prediction': pred_text}

        return output

if __name__ == '__main__':
    app.run(debug=True)

