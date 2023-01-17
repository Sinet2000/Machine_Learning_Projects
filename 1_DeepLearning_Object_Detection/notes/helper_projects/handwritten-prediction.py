import numpy as np
import tensorflow as tf
import logging
from PIL import Image
from keras.preprocessing import image
import keras
import cv2

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

# load the image
def load_image(filepath):
    img = tf.io.read_file(filepath)
    img = tf.image.decode_jpeg(img, channels=1)
    img = tf.image.resize(img, (28, 28))
    img = img / 255.0
    return img

def predict_digit(image_path):
    # read and grayscale the image
    image = cv2.imread(image_path)
    
    # resize the image to 28x28 pixels
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (28, 28))
    
    cv2.imwrite(image_path[:-4] + "-grayscaled.jpg", gray)
    
    # normalize image
    gray = gray / 255.0
    # reshape image to correct shape
    gray = gray.reshape(1, 28*28) # reshape to (784,)
    # Can try
    # gray = gray.reshape(-1, 28, 28, 1)
    # gray = gray.astype("float32") / 255.0
    # make prediction
    prediction = model.predict(gray)
    
    # get predicted value
    predicted_value = np.argmax(prediction)
    probability = prediction[0][predicted_value]
    return predicted_value, probability


# test the model

file_path = "test-img.jpg"
print("Predicted Number: ", predict_digit(file_path))
# save the model

model.save("mnist_model.h5")


# import numpy as np
# import tensorflow as tf
# import logging
# from PIL import Image
# from keras.preprocessing import image
# import keras
# import cv2

# # load the image
# def load_image(filepath):
#     img = tf.io.read_file(filepath)
#     img = tf.image.decode_jpeg(img, channels=1)
#     img = tf.image.resize(img, (28, 28))
#     img = img / 255.0
#     return img

# # load the mnist dataset
# (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

# # reshape and normalize the data
# x_train = x_train.reshape(-1, 28*28) / 255.0
# x_test = x_test.reshape(-1, 28*28) / 255.0

# # create a simple model
# model = tf.keras.models.Sequential([
#     tf.keras.layers.Dense(128, input_shape=(28*28,), activation='relu'),
#     tf.keras.layers.Dense(10, activation='softmax')
# ])

# # compile and train the model
# model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
# model.fit(x_train, y_train, epochs=5)

# # evaluate the model
# test_loss, test_acc = model.evaluate(x_test, y_test)
# logging.debug("Test Accuracy: {}".format(test_acc))

# # save the model
# model.save("mnist_model.h5")

# def predict_digit(image_path):
#     # read and grayscale the image
#     image = cv2.imread(image_path)
    
#     # resize the image to 28x28 pixels
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     gray = cv2.resize(gray, (28, 28))
    
#     cv2.imwrite(image_path[:-4] + "-grayscaled.jpg", gray)
    
#     # normalize image
#     gray = gray / 255.0
#     # reshape image to correct shape
#     gray = gray.reshape(1, 28, 28, 1)
#     # make prediction
#     prediction = model.predict(gray)
    
#     # get predicted value
#     predicted_value = model.predict_classes(gray)
#     probability = prediction[0][predicted_value]
#     return predicted_value, probability



# # test the model

# file_path = "test-img.jpg"
# print("Predicted Number: " + predict_digit(file_path))