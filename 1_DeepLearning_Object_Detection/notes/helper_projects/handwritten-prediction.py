import numpy as np
import tensorflow as tf
import logging
from PIL import Image
from keras.preprocessing import image
import keras
import cv2

# load the image
def load_image(filepath):
    img = tf.io.read_file(filepath)
    img = tf.image.decode_jpeg(img, channels=1)
    img = tf.image.resize(img, (28, 28))
    img = img / 255.0
    return img

# load the mnist dataset
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

# reshape and normalize the data
x_train = x_train.reshape(-1, 28*28) / 255.0
x_test = x_test.reshape(-1, 28*28) / 255.0

# create a simple model
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(128, input_shape=(28*28,), activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])

# compile and train the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5)

# evaluate the model
test_loss, test_acc = model.evaluate(x_test, y_test)
logging.debug("Test Accuracy: {}".format(test_acc))

# save the model
model.save("mnist_model.h5")

def predict_digit(image_path):
    # read and grayscale the image
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # resize the image to 28x28 pixels
    gray = cv2.resize(gray, (28, 28))
    # save the grayscaled image
    cv2.imwrite(image_path[:-4] + "-grayscaled.jpg", gray)
    # reshape the image for the model
    gray = gray.reshape(1, 28*28*1) # from gray = gray.reshape(1, 28, 28, 1)
    # load the trained model
    model = keras.models.load_model('mnist_model.h5')
    # predict the digit
    # normalize the pixel values
    gray = gray / 255.0
    
    result = model.predict(gray)
    # get the index of the highest probability
    prediction = np.argmax(result)
    return str(prediction)

    # # Load and resize the image
    # img = Image.open(file_path)
    # img = img.resize((28, 28))

    # # Convert image to grayscale
    # img = img.convert('L')

    # # Convert image to array
    # img_array = image.img_to_array(img)

    # # Normalize the image
    # img_array = img_array / 255

    # # Reshape the image to match the model input shape
    # img_array = img_array.reshape(1, 28, 28, 1)

    # # Load the model
    # model = keras.models.load_model('mnist_model.h5')

    # # Make a prediction
    # prediction = model.predict(img_array)

    # # Get the index of the highest probability
    # predicted_digit = np.argmax(prediction)

    # return str(predicted_digit)


# test the model

file_path = "test-img.jpg"
print("Predicted Number: " + predict_digit(file_path))