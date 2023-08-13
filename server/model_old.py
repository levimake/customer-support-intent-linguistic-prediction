from transformers import DistilBertForSequenceClassification, DistilBertTokenizer
# Setting up the device for GPU usage
from torch import cuda
import numpy as np

class MyModel:

    def __init__(self, model_path):
        # Set the device
        device = 'cuda' if cuda.is_available() else 'cpu'
        # Load the model
        self.model = model = DistilBertForSequenceClassification.from_pretrained(model_path)
        # Load the tokenizer
        self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        self.model = model.to(device)
        

    def predict(self, text):

        # Encode the text
        encoded_input = self.tokenizer(text=text,
                          truncation=True,
                          padding="max_length",
                          max_length=128,
                          return_tensors='pt').to(device)

        # Call the model to predict under the format of logits of 30 classes
        logits = self.model(**encoded_input).logits.cpu().detach().numpy()

        # Decode the result
        preds = get_preds_from_logits(logits)

        # Generate the output
        # print(generate_outputs(preds))

        return generate_outputs(preds)

# Apply two logics for Multiclass Columns and Multilabel Columns
def get_preds_from_logits(logits):

    INTENT_INDICES = range(0,19)
    TAGS_INDICES   = range(19,30)

    ret = np.zeros(logits.shape)

    # The first 19 columns are for customer intents. They should be handled with a multiclass approach
    # i.e. we fill 1 to the class with highest probability, and 0 into the other columns
    best_class = np.argmax(logits[:, INTENT_INDICES], axis=-1)
    ret[list(range(len(ret))), best_class] = 1

    # The other columns are for register tags. They should be handled with multilabel approach.
    # i.e. we fill 1 to every class whose score is higher than some threshold
    # In this example, we choose that threshold = 0
    ret[:, TAGS_INDICES] = (logits[:, TAGS_INDICES] >= 0).astype(int)

    return ret

def convert_to_title_case(input_string):
    # Split the input string by underscore
    words = input_string.split('_')
    
    # Capitalize the first letter of each word and join them with a space
    title_case = ' '.join(word.capitalize() for word in words)
    
    return title_case

def generate_outputs(preds):

    # LABEL DICTIONARY

    intents_map = {
        0: 'cancel_order',
        1: 'change_order',
        2: 'change_shipping_address',
        3: 'check_payment_methods',
        4: 'check_refund_policy',
        5: 'contact_customer_service',
        6: 'contact_human_agent',
        7: 'create_account',
        8: 'delete_account',
        9: 'edit_account',
        10: 'get_refund',
        11: 'payment_issue',
        12: 'place_order',
        13: 'recover_password',
        14: 'registration_problems',
        15: 'set_up_shipping_address',
        16: 'switch_account',
        17: 'track_order',
        18: 'track_refund'
    }

    intents_score_map = {0: 7, 1: 4, 2: 1, 3: 0, 4: 5, 5: 3, 6: 4, 7: 2, 8: 9, 9: 8, 10: 2, 
                                    11: 6, 12: 0, 13: 7, 14: 7, 15: 4, 16: 3, 17: 0, 18: 10}


    tags_labels = np.array(['Q', 'P', 'W', 'K', 'B', 'C', 'I', 'M', 'L', 'E', 'Z'])

    intents_array = preds[0][:19]
    tags_array = preds[0][19:]

    # intent prediction
    intent = intents_map[intents_array.argmax()]
    intent_complexity_score = intents_array.argmax()

    # tag prediction
    output_tag = ""
    for i in np.where(tags_array == 1)[0]:
        output_tag += tags_labels[i]

    utterance_category = convert_to_title_case(get_category(intent))
    intent = convert_to_title_case(intent)
    issue_formality, language_complexity, content_complexity, language_score = get_linguistics(output_tag)

    issue_complexity = get_issue_complexity(intent_complexity_score + language_score)

    outputs = {
        "customer_intent": intent,
        "utterance_category": utterance_category,
        "language_formality": issue_formality,
        "language_complexity": language_complexity,
        "content_complexity": content_complexity,
        "issue_complexity": issue_complexity
    }

    return outputs

def get_category(intent):
    #categories and intents
    account_types = ["create_account", "delete_account", 
                     "edit_account",   "recover_password",
                     "registration_problems", "switch_account"]

    order_types = ["cancel_order", "change_order", "place_order", "track_order"]

    contact_types = ["contact_customer_service", "contact_human_agent"]

    payment_types = ["check_payment_methods", "payment_issue"]

    refund_types = ["check_refund_policy", "get_refund", "track_refund"]

    shipping_types = ["change_shipping_address", "set_up_shipping_address"]

    if intent in account_types:
        return "ACCOUNT"
    elif intent in order_types:
        return "ORDER"
    elif intent in contact_types:
        return "CONTACT"
    elif intent in payment_types:
        return "PAYMENT"
    elif intent in refund_types:
        return "REFUND"
    elif intent in shipping_types:
        return "SHIPPING"

def get_linguistics(tag):

    formality = get_formality(tag)
    language_complexity, language_complexity_score = get_language_complexity(tag)
    content_complexity,  content_complexity_score = get_content_complexity(tag)

    total_language_score = language_complexity_score + content_complexity_score

    return formality, language_complexity, content_complexity, total_language_score
    
def get_formality(tags):
    """Predicts the formality of an utterance based on the tags "P" and "Q".

    Args:
        tags: A list of tags.

    Returns:
        A string indicating the formality of the utterance.
    """

    if "P" in tags and "Q" in tags:
        # The utterance is both polite and colloquial.
        formality = "mixed" #
    elif "P" in tags:
        # The utterance is polite.
        formality = "formal" 
    elif "Q" in tags:
        # The utterance is colloquial.
        formality = "informal"
    else:
        # The utterance is neither polite nor colloquial.
        formality = "unknown"

    return formality

def get_language_complexity(tags):
    """Analyzes the complexity of an utterance based on the linguistic tags.

    Args:
        tags: A list of linguistic tags.

    Returns:
        A string indicating the complexity of the utterance.
    """

    complexity = "low"
    score = 0

    for tag in tags:
        if tag == "B" :
            score += 1
        elif tag == "I" or tag == "C":
            score += 2
        elif tag == "M" or tag == "L":
            score += 3
        elif tag == "E":
            score += 4

    if score >= 10:
        complexity = "high"
    elif score >= 4 and score <= 7:
        complexity = "medium"
    else:
        complexity = "low"

    return complexity, score

def get_content_complexity(tags):

    complexity = "low"
    score = 0
    for tag in tags:
        if tag == "W":
            score += 5
        elif tag == "K":
            score += 5

    if score == 10:
        complexity = "high"
    elif score == 5:
        complexity = "medium"
    else:
        complexity = "low"

    return complexity, score

def get_issue_complexity(score):

    perc = ( score / 30 ) * 100

    if perc > 80:
        return "high"
    elif perc > 50:
        return "medium"
    else :
        return "low"
        
# content-complexity - max - 10
# language-complexity - max - 10
# language-formality - not considered for score