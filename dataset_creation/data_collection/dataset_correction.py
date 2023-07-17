import os
import json
import requests

API_KEY = "AIzaSyCAg7YpDxaOp_GS7bMvJ2KkS6qhvexaNDw"

place_details_query = "https://maps.googleapis.com/maps/api/place/details/json?placeid={0}&fields=address_component,adr_address,business_status,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,plus_code,type,url,utc_offset,vicinity,price_level,rating,review,user_ratings_total&key={1}"

city_list = ["amsterdam", "berlin", "frankfurt", "istanbul", "hamburg", "london", "madrid", "munich", "paris", "rome", "vienna" ]
city_search_terms = {
    "amsterdam": "amsterdam",
    "berlin": "berlin",
    "frankfurt": "frankfurt",
    "istanbul": 'i̇stanbul',
    "hamburg": "hamburg",
    "london": "london", 
    "madrid": "madrid", 
    "munich": 'münchen', 
    "paris": "paris", 
    "rome": "roma", 
    "vienna": "wien"
}


def find_details(place_id):
    query = place_details_query.format(place_id, API_KEY)
    result = json.loads(requests.get(query).text)["result"]
    return result

def check_if_include_valid_city(vicinity):
    for city in city_list:
        if city_search_terms[city] in vicinity.lower():
            return city
    return None
    
with open(f"data/all_cities_final_last2.json", "r") as fp:
    data = json.load(fp)
    

    
all_poi_list = []

city_poi_numbers_before = {k: 0 for k in city_list}

c = 0

for poi in data:
    try:
        vicinity = poi["vicinity"]
    except:
        vicinity = ""
    try:
        formatted_address = poi["formatted_address"]
    except:
        formatted_address = ""
    city = poi["city"]
    city_poi_numbers_before[city] = city_poi_numbers_before[city] + 1
    if city_search_terms[city] not in vicinity.lower() + formatted_address.lower():
        c += 1
        new_city = check_if_include_valid_city(vicinity + formatted_address)
        if new_city is not None:
            print(f"{poi['name']}, old city: {poi['city']}, new city: {new_city}")
            poi["city"] == new_city
            all_poi_list.append(poi)
            
    else:
        all_poi_list.append(poi)
print(c)
with open(f"data/all_cities_final_last3.json", "w") as fp:
    fp.write(json.dumps(all_poi_list, indent=4))

city_poi_numbers_after = {k: 0 for k in city_list}
for poi in all_poi_list:
    city = poi["city"]
    city_poi_numbers_after[city] = city_poi_numbers_after[city] + 1
    
print("Before:")
print(city_poi_numbers_before)
print("Aftern:")
print(city_poi_numbers_after)