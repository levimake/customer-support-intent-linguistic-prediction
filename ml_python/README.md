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
