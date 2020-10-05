import tensorflow as tf
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
import numpy as np
import werkzeug
import faceDetectionWithAPIAndVision as fdwaav
import cropping as crp
from keras.models import model_from_json



app = Flask(__name__)
api = Api(app)


# argument parsing
parser = reqparse.RequestParser()
parser.add_argument('img', type=werkzeug.datastructures.FileStorage, location='files')

def preprocess(img):
    img = img/255
    return img

class PredictSentiment(Resource):
    def post(self):
        # use parser and find the user's query
        args = parser.parse_args()
        user_img = args['img'].read()
        # use vision to detect face
        face = fdwaav.faceDetection(user_img)
        # use cropping to center on face and resize image
        cropped_face = crp.cropImage(user_img,face)
        # start preprocessing by turning image in levels of gray
        data = np.asarray(cropped_face.convert('L'))
        # preprocessing
        data = np.array(list(map(preprocess, data)))
        image = data.reshape(1, 48, 48, 1)
        
        
        json_file = open('fer.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model_json)
        # load weights into new model
        loaded_model.load_weights("fer.h5")
        print("Loaded model from disk")
        
        #with tf.device('/CPU:0'):
        predict = loaded_model.predict_classes((image))
        if predict[0] == 0 :
            prediction = 'Angry'
        elif predict[0] == 1 : 
            prediction = 'Disgust'
        elif predict[0] == 2 : 
            prediction = 'Fear'
        elif predict[0] == 3 : 
            prediction = 'Joy'
        elif predict[0] == 4 : 
            prediction = 'Sadness'
        elif predict[0] == 5 : 
            prediction = 'Surprise'
        elif predict[0] == 6 : 
            prediction = 'Neutral'
               
        #create JSON object
        output = {'prediction': prediction}        
        return output


# Setup the Api resource routing here
# Route the URL to the resource
api.add_resource(PredictSentiment, '/')


if __name__ == '__main__':
    app.run(debug=False)
    
    
    
    
    
    
    