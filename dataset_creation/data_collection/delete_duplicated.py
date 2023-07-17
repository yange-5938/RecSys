import json
from collections import Counter

def find_duplicates(lst):
    counter = Counter(lst)
    duplicates = [item for item, count in counter.items() if count > 1]
    return duplicates

def find_indices(lst, target):
    indices = [index for index, item in enumerate(lst) if item == target]
    return indices

with open(f"data/all_cities_final_last3.json", "r") as fp:
    data = json.load(fp)
    
names = [p["name"].lower() for p in data]

duplicated_names = find_duplicates(names)
seen_duplicated = []
new_all_pois = []

for poi in data:
    if poi["name"].lower() in duplicated_names:
        if poi["name"].lower() not in seen_duplicated:
            new_all_pois.append(poi)
            seen_duplicated.append(poi["name"].lower())
    else:
        new_all_pois.append(poi)
        
with open(f"data/all_cities_final_last4.json", "w") as fp:
    fp.write(json.dumps(new_all_pois, indent=4))         