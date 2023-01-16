# backend/model.py
import tensorflow as tf

model = tf.keras.models.load_model("path/to/model.h5")

def predict(image_data):
    # Preprocess the image data
    image_data = ...

    # Make a prediction using the model
    prediction = model.predict(image_data)

    # Return the prediction
    return prediction
