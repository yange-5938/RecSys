from transformers import AutoFeatureExtractor, AutoModelForImageClassification
from torchvision import transforms as T
from PIL import Image
import os

def transform(img):
    inference_transform = T.Compose([T.Resize((64,64)), 
                                T.ToTensor(),
                                T.Normalize(mean=[0.485, 0.456, 0.406],
                                            std=[0.229, 0.224, 0.225])])
    return inference_transform(img)

root_path = "../RS-dataset-creation/data/author_imgs"
img_paths = [os.path.join(root_path, p) for p in os.listdir(root_path)]
# img_path = "../RS-dataset-creation/data/author_imgs/ChIJR3122B9u5kcRaCck3PlB9DM_ChdDSUhNMG9nS0VJQ0FnSUNSM3JtQmdBRRAB.png"
batch = []
for p in img_paths[:256]:
    im = Image.open(p).convert ("RGB")
    batch.append(im)

extractor = AutoFeatureExtractor.from_pretrained("rizvandwiki/gender-classification-2")

model = AutoModelForImageClassification.from_pretrained("rizvandwiki/gender-classification-2")

inputs = extractor(batch, return_tensors='pt')
output = model(**inputs)

# Predicted Class probabilities
proba = output.logits.softmax(1)

# Predicted Classes
preds = proba.argmax(1)

print(proba, preds)