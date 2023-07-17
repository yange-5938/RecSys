import os
import json
import requests

city_list = ["amsterdam", "berlin", "frankfurt", "istanbul", "hamburg", "london", "madrid", "munich", "paris", "rome", "vienna" ]
city_search_terms = {
    "amsterdam": "amsterdam",
    "berlin": "berlin",
    "frankfurt": "frankfurt",
    "i̇stanbul": 'istanbul',
    "hamburg": "hamburg",
    "london": "london", 
    "madrid": "madrid", 
    "münchen": 'munich', 
    "paris": "paris", 
    "roma": "rome", 
    "wien": "vienna"
}
    
with open(f"data/all_cities_final_last2.json", "r") as fp:
    data = json.load(fp)
    
def get_corrected_city(poi):
    try:
        vicinity = poi["vicinity"]
    except:
        vicinity = ""
    try:
        formatted_address = poi["formatted_address"]
    except:
        formatted_address = ""
    
    for k,v in city_search_terms.items():
        if k in vicinity.lower() + formatted_address.lower():
            return v
    return ""
    
for poi in data:
    corrected_city = get_corrected_city(poi)
    poi["city"] = corrected_city
    
with open(f"data/all_cities_final_last3.json", "w") as fp:
    fp.write(json.dumps(data, indent=4))

# city_poi_numbers_after = {k: 0 for k in city_list}
# for poi in all_poi_list:
#     city = poi["city"]
#     city_poi_numbers_after[city] = city_poi_numbers_after[city] + 1
    
# print("Before:")
# print(city_poi_numbers_before)
# print("Aftern:")
# print(city_poi_numbers_after)