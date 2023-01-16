# backend/app.py
from flask import Flask, jsonify, request
from keras.preprocessing import image
from keras.models import load_model
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

model = load_model("mnist_cnn.h5")

@app.route('/predict', methods=["POST"])
def predict():
    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    img = image.load_img(file, target_size=(28, 28), color_mode = "grayscale")
    x = image.img_to_array(img)
    x = x.reshape((1,) + x.shape)
    x = x/255
    prediction = model.predict(x).argmax()
    return jsonify({"prediction": str(prediction)})

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
    app.run(debug=True, port=5000)
