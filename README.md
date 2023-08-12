# Customer Intent Linguistic Prediction Model

This repository contains the implementation of machine learning model which predicts customer intent and language complexity from customer utterance.

The model is trained using the customer-service domain dataset provided by bitext.

# Run it
- Clone the repository
```
pip install -r requirements.txt
```
- Run the server (api) on one console
- Run the react app for a web interface

*the detailed instructions to run each components are available in their respective folders*

# Notes
- The model is built using a fine-tuned DistilBERT to perform multiclass classification and multilabel classification from a single model.
- The server is built using FastAPI
- The react-app is created using vite and tailwind css

