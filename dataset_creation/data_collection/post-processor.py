import os
import json
from deep_translator import GoogleTranslator
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor

with open("data/reviews.json", "r") as fp:
    reviews = json.load(fp)
    
def translate(poi_id, revs):
    revs_de = [r["review_text"] if r["review_text"] is not None else '' for r in revs]
    try:
        revs_en = GoogleTranslator(source='de', target='en').translate_batch(revs_de)
        for i,r in enumerate(revs):
            r["review_text_en"] = revs_en[i]
        with open(f"data/translated/{poi_id}.json", "w") as fp:
            fp.write(json.dumps(revs, indent=4))
    except:
        with open("data/error_ids.txt", "a") as fp:
            fp.write(f"{poi_id}\n")
    
new_reviews = {}
error_ids = []

with ThreadPoolExecutor(max_workers=5) as executor:
    for poi in reviews:
        poi_id = list(poi.keys())[0]
        if not os.path.exists(f"data/translated/{poi_id}.json"):
            executor.submit(translate, poi_id, poi[poi_id]["scraper_reviews"])
        
    



