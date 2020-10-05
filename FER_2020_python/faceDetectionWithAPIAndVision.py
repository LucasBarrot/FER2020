# -*- coding: utf-8 -*-
import requests

# Detect and return the first face found location in the image_data given (byte array : <class 'bytes'> )
def faceDetection(image_data):
    
    ENDPOINT = 'https://istancedetecface.cognitiveservices.azure.com/' # Set the endpoint
    KEY = '787e01a860bb4be0a7fb0044e286931c' # Set the autentification key
    analyze_url = ENDPOINT + "vision/v3.0/analyze" # Set the complete url
    
    # Read the image into a byte array
    #image_data = open(image_path, "rb").read()
    
    # set the headers of the request
    headers = {'Ocp-Apim-Subscription-Key': KEY,
               'Content-Type': 'application/octet-stream'}
    
    # set the parameters of the request
    params = {'visualFeatures': 'Faces'}
    
    # send the request and get the response
    response = requests.post(
        analyze_url, headers=headers, params=params, data=image_data)
    
    # raise a statut if one occured
    response.raise_for_status()
    
    # The 'complete_response_json' object contains various fields that describe the image. The most
    # relevant caption for the image is obtained from the 'description' property.
    complete_response_json = response.json()
    # print(complete_response_json)
    found_face_json = complete_response_json["faces"][0]["faceRectangle"] # select only the face rectangle of the first face detected
    # print (found_face_json)
    return found_face_json