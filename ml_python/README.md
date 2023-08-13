# Multiclass and Multilabel Text Classification in ONE DistilBERT Model

## 1. Introduction
DistilBERT is a small, fast, cheap and light Transformer model trained by distilling BERT base. It has 40% less parameters than bert-base-uncased, runs 60% faster while preserving over 95% of BERT’s performances as measured on the GLUE language understanding benchmark.

Multiclass and multilabel classifications are two familiar tasks to most data sscientists. The most well-known approach to these problems is to model them as optimization problems which minimize a different objective function for each kind.

- The cross-entropy-loss function for multiclass classification
- The binary-entropy-loss function for multilabel classificaiton

### 1.1 Problem
- Lack of GPU memory: cannot load many models simultaneously
- Response Time requirement: We must predict everything within one second, so we call fewer models as possible.

### 1.2 Examples
- Given image of an animal:
    - Predict its species {cat, dog, lion, giraffe}: Multiclass, as it will be either one of them; cannot be more than one.
    - Predict its health condition {healthy, alive, dead, critical, unhealthy}: Multilabel, as it can be more than conditions at once.
        - A dog can be healthy and alive at the same time
        - A cat can be alive, unhealthy and critical at the same time.

- Given response from a survey:
    - Predict the rating: Multiclass, one class between 1 to 5 {1, 2, 3, 4, 5}
    - Predict the emotions: Multilabels {joy, happiness, sadness, anger, ...}

### 1.3 Objectives
Combine a multiclass and multilabel classification task by using a **combined loss** function where *softmax* is applied for multiclass classes and *sigmoid* is used for multilabel classes.

#### 1.3.1 Softmax
The softmax function can be used for multiclass classification by outputting a vector of probabilities, where each probability represents the likelihood of the input belonging to a particular class. For example, if there are 10 classes, the softmax function would output a vector of 10 probabilities, where each probability would range from 0 to 1. The class with the highest probability would be the class that the input is most likely to belong to.

Let's say we have a neural network that is trained to classify images of animals into one of 10 classes: cat, dog, bird, fish, frog, horse, cow, sheep, pig, and elephant. The neural network has an output layer with 10 neurons, each of which represents a different class. The softmax function is used to activate the output layer neurons, which outputs a vector of probabilities, where each probability represents the likelihood of the input image belonging to a particular class.

The neural network then uses the output of the softmax function to make a prediction. The class with the highest probability is the class that the neural network predicts the input image to belong to. In this example, the neural network would predict that the input image is a cat.

#### 1.3.2 Sigmoid
The sigmoid function is a good choice for multilabel classification because it can output probabilities for multiple labels. This is important in multilabel classification, because a data point can belong to multiple labels at the same time. For example, a piece of text could be both "positive" and "negative". The sigmoid function allows the neural network to capture this nuance by outputting probabilities for both labels.

# 2. [Dataset](../data)
The dataset covers "Customer Support" domain and contains customer utterances, customer_intent, category and linguistic tags. (Over 8000 utterances and 27 most common intents grouped in 11 categories).

The dataset will be pre-processed by keeping only the columns: Utterance, Intent, tags(language)

Here is a sample row of the dataset in JSON form (for readability; the original dataset is in csv):

```
{
    "utterance": "i have bought the same item twice cancel order 00123842",
    "intent": "cancel_order",
    "tags": "BCELQ"
}
```

- Intents - Multiclass - One among {cancel_order, check_invoice, check_refund_policy, ...}
- [Tags](../data/TAGS.md) - Multilabel - {Q, P, W, K, B, C, I, M, L, E, Z}

- Additional Modification on Tags: For the current task, we are using only the following tags:
    - P (Politeness)
    - W (Offensive Content)
    - C (Cordinated Structure)
    - Q (Colloquial Style)
    - Z (Errors)

- If the tags are empty, utterance is considered informal and polite.

- Formality of the language is calculated as follows:
    - Initially, formality is set to 0
    - If P, formality += 1
    - If W, formality -= 1
    - If C, formality += 1
    - If Q, formality -= 1
    - If Z, formality -= 1
    - If the final formality score is greater than 0, the utterance is considered formal. Else, informal.

- Language Tone is calculated as follows:
    - Initially set to "neutral"
    - If W, tone = "frustrated"

- Communication style is calculated as follows:
    - Initially set to polite
    - If W, politeness -= 1
    - If politeness_score = 0, impolite
    - If politeness_score > 0, polite

- Issue complexity is calculated as follows:
    - Random scoring is performed on all intents from 0 to 10 to assign to random scores where the highest score refers to higher issue complexity.
    - Utterance length is also considered for calculating issue complexity. (The max_len of utterance = 128)
    - Therefore, a percentile score is calculated from the intent_score and utterance_length.
    - The values {high, medium, low} is assigned based on the final score.
    - If the utterance contained offensive content, issue is automatically promoted as a higher priority issue as offensive content in an utterance refers to a frustrated customer who requires a faster resolution for maintaining the customer satisfaction.

## 2.1 [Dataset Distribution](./data_distribution.ipynb)

## 2.2 Goal
- Predict the customer intent - a single class - multiclass classification on 19 classes.  
- Predict the linguists - a list (can be empty) - multilable classification problem on 11 classes. <--TODO: Simplify it due to bad data distribution

For more information on the process, please refer to the [notebook](./model_creation.ipynb)

# 3. References
- Multiclass and Multilabel Text Classification in One BERT Model - [https://lajavaness.medium.com/multiclass-and-multilabel-text-classification-in-one-bert-model-95c54aab59dc](https://lajavaness.medium.com/multiclass-and-multilabel-text-classification-in-one-bert-model-95c54aab59dc)
- Fine Tuning DistilBERT for MultiLabel Text Classification: [https://colab.research.google.com/github/DhavalTaunk08/Transformers_scripts/blob/master/Transformers_multilabel_distilbert.ipynb](https://colab.research.google.com/github/DhavalTaunk08/Transformers_scripts/blob/master/Transformers_multilabel_distilbert.ipynb)
- Fine Tuning Transformer for MultiClass Text Classification: [https://colab.research.google.com/github/abhimishra91/transformers-tutorials/blob/master/transformers_multiclass_classification.ipynb](https://colab.research.google.com/github/abhimishra91/transformers-tutorials/blob/master/transformers_multiclass_classification.ipynb)

