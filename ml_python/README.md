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
