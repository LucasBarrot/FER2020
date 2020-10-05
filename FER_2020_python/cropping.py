# -*- coding: utf-8 -*-
from PIL import Image
import io

# function to crop and resize the image according to the first face found location
def cropImage(image_data, faceRect_json):

    # To access to the crop function, we need to have an Image type. not bytes array
    image = Image.open(io.BytesIO(image_data))
    
    marge = 100 # Set a marge to be sure that the image contains the boder of the face
    
    # Create left/top border values and width/height values, 
    left = int(faceRect_json["left"]) - marge
    top = int(faceRect_json["top"]) - marge
    width = int(faceRect_json["width"]) + marge*2
    height = int(faceRect_json["height"]) + marge*2
    
    box = (left, top, left+width, top+height) # Create Box for the area we want to keep
    image_cropped = image.crop(box) # Crop Image
    size = 48, 48 # set the size value according to the model requirements
    image_cropped.thumbnail(size) # resize the image
    # print(type(image_cropped))
    # image_cropped.show()
    # image_cropped.save("test_thumbail.jpg") # Save Image
    return image_cropped
