The server is built on FASTAPI backend which connects to the customer-intent-linguistic prediction model.

## Dependencies Required
```
pip install torch transformers httpie uvicorn pydantic fastapi
```

## Running the server
```
uvicorn api:app
```

## Example Requests

### Model1 (Main Model)
**Request:**
```
http POST http://127.0.0.1:8000/predict text="Can you help me with cancelling my order"
```

**Response:**
```
{
    "content_complexity": "low",
    "customer_intent": "Cancel Order",
    "issue_complexity": "low",
    "language_complexity": "low",
    "language_formality": "informal",
    "utterance_category": "Order"
}
```

### Sentiment Model (From HuggingFace Pipeline)
**Request:**
```
http POST http://127.0.0.1:8000/predict_sentiment text="Can you help me with cancelling my order"
```

**Response:**
```
{
    "customer_sentiment": "neutral"
}
```
