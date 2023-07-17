import json
import os
import requests
import shutil
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor
import requests
from PIL import Image
import numpy as np
from transformers import ViTFeatureExtractor, ViTForImageClassification
from transformers import AutoFeatureExtractor, AutoModelForImageClassification

def save_img(review, img_url, poi_id):
    res = requests.get(img_url, stream = True)    
    if res.status_code == 200:
        author_id = review["author_id"]
        with open(f"data/author_imgs/{poi_id}_{author_id}.png",'wb') as f:
            shutil.copyfileobj(res.raw, f)

def download_author_imgs():
    with open("data/reviews.json", "r") as fp:
        poi_reviews = json.load(fp)

    os.makedirs("data/author_imgs", exist_ok=True)
    for poi in tqdm(poi_reviews):
        poi_id = list(poi.keys())[0]
        poi_reviews = poi[poi_id]["scraper_reviews"]
        with ThreadPoolExecutor(max_workers=5) as executor:
            for review in poi_reviews:
                try:
                    img_url = review["author_img_url"]
                except:
                    continue
                executor.submit(save_img, review, img_url, poi_id)

def get_human_authors_imgs():
    with open("data/inference.txt", "r") as fp:
        lines = fp.read()
    lines = lines.split("\n")
    img_names = [l.split(";")[0].split("/")[-1] for l in lines if int(l.split(";")[-1])==1]
    img_names = list(set(img_names))
    return img_names
    

def extract_age(root_path, img_paths, batch_size=256):
    remaining_imgs = img_paths[-(len(img_paths) % batch_size):]
    img_paths = img_paths[:-(len(img_paths) % batch_size)]
    batches = np.split(img_paths, len(img_paths) // batch_size)
    batches.append(remaining_imgs)
    
    model = ViTForImageClassification.from_pretrained('nateraw/vit-age-classifier')
    transforms = ViTFeatureExtractor.from_pretrained('nateraw/vit-age-classifier')
    
    """
    "0": "0-2", "1": "3-9","2": "10-19","3": "20-29","4": "30-39",
    "5": "40-49","6": "50-59","7": "60-69","8": "more than 70"
    """
    age_preds = [] 
    print("[INFO]: Ages extracting...")
    for batch in tqdm(batches):
        batch_imgs = [Image.open(os.path.join(root_path, p)).convert ("RGB") for p in batch]
        inputs = transforms(batch_imgs, return_tensors='pt')
        batch_output = model(**inputs)
        proba = batch_output.logits.softmax(1) # Predicted Class probabilities
        preds = proba.argmax(1)# Predicted Classes
        preds = preds.cpu().numpy()
        age_preds.extend(preds)
    return age_preds

def extract_gender(root_path, img_paths, batch_size=256):
    remaining_imgs = img_paths[-(len(img_paths) % batch_size):]
    img_paths = img_paths[:-(len(img_paths) % batch_size)]
    batches = np.split(img_paths, len(img_paths) // batch_size)
    batches.append(remaining_imgs)
    
    extractor = AutoFeatureExtractor.from_pretrained("rizvandwiki/gender-classification-2")
    model = AutoModelForImageClassification.from_pretrained("rizvandwiki/gender-classification-2")
    
    gender_preds = [] # 0: female, 1: male
    print("[INFO]: Genders extracting...")
    for batch in tqdm(batches):
        batch_imgs = [Image.open(os.path.join(root_path, p)).convert ("RGB") for p in batch]
        inputs = extractor(batch_imgs, return_tensors='pt')
        batch_output = model(**inputs)
        proba = batch_output.logits.softmax(1) # Predicted Class probabilities
        preds = proba.argmax(1)# Predicted Classes
        preds = preds.cpu().numpy()
        gender_preds.extend(preds)
    return gender_preds
    
if __name__ == "__main__":
    root_path = "data/author_imgs"
    batch_size = 128
    author_imgs = get_human_authors_imgs()
    age_preds = extract_age(root_path, np.array(author_imgs), batch_size=batch_size)
    gender_preds = extract_gender(root_path, np.array(author_imgs), batch_size=batch_size)
    author_demographics = {}
    for img, age, gender in zip(author_imgs, age_preds, gender_preds):
        tmp = img.split(".")[0].split("_")
        author_id = tmp[-1]
        author_demographics[author_id] = {"age": int(age), "gender": int(gender)}
    print(author_demographics)
    with open("data/author_demographics.json", "w") as fp:
        fp.write(json.dumps(author_demographics, indent=4))