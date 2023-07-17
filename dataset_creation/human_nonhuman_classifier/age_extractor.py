import requests
from PIL import Image

from transformers import ViTFeatureExtractor, ViTForImageClassification

img_path = "../RS-dataset-creation/data/author_imgs/ChIJR3122B9u5kcRaCck3PlB9DM_ChdDSUhNMG9nS0VJQ0FnSUNSM3JtQmdBRRAB.png"
im = Image.open(img_path).convert ("RGB")

# Init model, transforms
model = ViTForImageClassification.from_pretrained('nateraw/vit-age-classifier')
transforms = ViTFeatureExtractor.from_pretrained('nateraw/vit-age-classifier')

# Transform our image and pass it through the model
inputs = transforms(im, return_tensors='pt')
output = model(**inputs)

# Predicted Class probabilities
proba = output.logits.softmax(1)

# Predicted Classes
preds = proba.argmax(1)

print(proba, preds)