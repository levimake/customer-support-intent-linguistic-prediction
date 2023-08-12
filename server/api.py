from typing import Dict

from fastapi import Depends, FastAPI

from pydantic import BaseModel

from model import MyModel

from fastapi.middleware.cors import CORSMiddleware

import os
#ML Model
# Load the custom pretrained model

#navigate to parent directory
parent_dir = os.path.dirname(os.getcwd())

#navigate to model directory
model_path = os.path.join(parent_dir, 'models')

model = MyModel(model_path)

    # model = MyModel('model.ckpt')
    # text = "This is a finetuned BERT model."
    # prediction = model.read(text)
    # print(prediction)

from sentiment import SentimentModel
sentimentModel = SentimentModel()

app = FastAPI()

class CustomerUtterance(BaseModel):

    text: str

class UtteranceResponse(BaseModel):

    customer_intent: str

    utterance_category: str

    language_formality: str

    language_complexity: str

    content_complexity: str

    issue_complexity: str

class SentimentResponse(BaseModel):

    customer_sentiment: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/index")
def home():
    return "hello, world"


@app.post("/predict", response_model=UtteranceResponse)
def predict(request: CustomerUtterance):

    outputs = model.predict(request.text)

    return UtteranceResponse(

        customer_intent = outputs["customer_intent"],

        utterance_category = outputs["utterance_category"],

        language_formality = outputs["language_formality"],

        language_complexity = outputs["language_complexity"],

        content_complexity = outputs["content_complexity"],

        issue_complexity = outputs["issue_complexity"]
 
    )

@app.post("/predict_sentiment", response_model=SentimentResponse)

def predict(request: CustomerUtterance):

    outputs = sentimentModel.predict(request.text)

    return SentimentResponse (
        customer_sentiment = outputs
    )
