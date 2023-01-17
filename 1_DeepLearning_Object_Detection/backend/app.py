# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin
import base64
from PIL import Image
from keras.preprocessing import image
from keras.models import load_model
import os
import uuid
from time import strftime
import traceback
from werkzeug.utils import secure_filename
import logging

app = Flask(__name__)
# CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}})
CORS(app, origins=['http://localhost:3000'])
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

# @app.before_request
# def log_request_info():
#     app.logger.debug('Body: %s', request.get_data())
#     app.logger.debug('json: %s', request.json)
#     app.logger.debug('form: %s', request.form)
    
# @app.after_request
# def after_request(response):
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#     return response

model = load_model("mnist_cnn.h5")

def upload_image_to_folder(request_form_data, name_postfix=""):
    image_data = request_form_data
    image_data = image_data.split(',')[1]
    image_data = bytes(image_data, 'utf-8')
    file_name = img_name = '{}-{}{}'.format(str(uuid.uuid4()), name_postfix, ".jpg")
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)

    with open(file_path, 'wb') as f:
        f.write(base64.decodebytes(image_data))
        
    return file_path
        
@app.route('/predict', methods=["POST"])
def predict():
    img_name = upload_image_to_folder(request.form['imageData'], name_postfix="predict")
        
    img = image.load_img(img_name, target_size=(28, 28), color_mode = "grayscale")
    x = image.img_to_array(img)
    x = x.reshape((1,) + x.shape)
    x = x/255
    prediction = model.predict(x).argmax()
    return jsonify({"prediction": str(prediction)})


@app.route('/upload', methods=['POST'])
def upload():    
    
    img_name = upload_image_to_folder(request.form['imageData'])

    return jsonify(success=True)
    
# @app.errorhandler(Exception)
# def exceptions(e):
#     tb = traceback.format_exc()
#     timestamp = strftime('[%Y-%b-%d %H:%M]')
#     app.logger.error('%s %s %s %s %s 5xx INTERNAL SERVER ERROR\n%s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, tb)
#     return e.status_code

# @app.route("/predict", methods=["POST"])
# def predict():
#     # Get the image data from the request
#     image_data = request.get_json()["image"]

#     # Use the model to make a prediction
#     prediction = model.predict(image_data)

#     # Return the prediction as a JSON response
#     return jsonify({"prediction": prediction})

# @app.route('/upload', methods=['POST'])
# def upload():
#     file = request.files['file']
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#     file.save(file_path)
#     return jsonify({'message': 'Image uploaded successfully', 'file_path': file_path})

# @app.route('/images', methods=['GET'])
# def images():
#     images = os.listdir(UPLOAD_FOLDER)
#     return jsonify({'images': images})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
