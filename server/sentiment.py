from transformers import pipeline

class SentimentModel:
    def __init__(self):
        self.pipeline = pipeline(model="finiteautomata/bertweet-base-sentiment-analysis")

    def predict(self, text):
        output = self.pipeline(text)
        customer_sentiment = output[0]['label']

        if customer_sentiment == "POS":
            return "positive"
        elif customer_sentiment == "NEU":
            return "neutral"
        elif customer_sentiment == "NEG":
            return "negative"