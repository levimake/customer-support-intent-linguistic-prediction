from model import MyModel
import os
#ML Model
# Load the custom pretrained model

#navigate to parent directory
parent_dir = os.path.dirname(os.getcwd())

#navigate to model directory
model_path = os.path.join(parent_dir, 'models')

model = MyModel(model_path)

model.predict("I need help cancelling my order.")
