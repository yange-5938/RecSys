import os
import json
import requests
from tqdm import tqdm

def find_details(place_id):
    query = place_details_query.format(place_id, API_KEY)
    result = json.loads(requests.get(query).text)["result"]
    return result

def get_sing_place_details(place_name):
    query = place_search_query.format(place_name, API_KEY)
    place_search_result = json.loads(requests.get(query).text)
    candidates_id = place_search_result["candidates"][0]["place_id"]
    place_details = find_details(candidates_id)
    return place_details
    
    
API_KEY = "AIzaSyCAg7YpDxaOp_GS7bMvJ2KkS6qhvexaNDw"

place_search_query = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={0}&inputtype=textquery&fields=place_id&key={1}"
place_details_query = "https://maps.googleapis.com/maps/api/place/details/json?placeid={0}&fields=address_component,adr_address,business_status,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,plus_code,type,url,utc_offset,vicinity,price_level,rating,review,user_ratings_total&key={1}"
photo_query = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=4000&photoreference={1}&key={0}'

space_char = "%20"

place_detail = get_sing_place_details("English Garden")

with open("tmp.json", "w") as fp:
    fp.write(json.dumps(place_detail, indent=4))

# photo_list = []
# review_list = []

# cities = os.listdir(os.path.join("data", "poi_details"))
# errors = []
# for city in cities:
#     print(f"[INFO]: {city} poi details are downloading from Google's api...")
#     city_place_details_list = []
#     place_list = os.listdir(os.path.join("data", "poi_details", city))
#     for place_json in tqdm(place_list):
#         with open(os.path.join("data", "poi_details", city, place_json), "r") as fp:
#             place_data = json.load(fp)
#         place_name = " ".join(place_json.split(".")[0].split("_"))
#         query = place_search_query.format(place_name, API_KEY)
#         place_search_result = json.loads(requests.get(query).text)
#         try:
#             candidates_id = place_search_result["candidates"][0]["place_id"]
#             place_details = find_details(city, candidates_id)
#         except:
#             errors.append(f"[ERROR]: {city}, {place_name} is not found!")
#             continue
#         try:
#             review_list.append({place_details["place_id"]: {"scraper_reviews": place_data["reviews"], "api_reviews": place_details["reviews"]}})
#         except:
#             review_list.append({place_details["place_id"]: {"scraper_reviews": place_data["reviews"], "api_reviews": []}})
#             errors.append(f"[ERROR]: {city}, {place_name} has no review on api")
#         try:
#             photo_list.append({place_details["place_id"]: place_details["photos"]})
#         except:
#             errors.append(f"[ERROR]: {city}, {place_name} has no photo")
#         try:
#             del place_details["reviews"]
#             del place_details["photos"]
#         except:
#             errors.append(f"[ERROR]: {city}, {place_name} photos or reviews could not deleted from the api response")
#         city_place_details_list.append(place_details)

#     with open(os.path.join("data", f"{city}.json"), "w") as fp:
#         fp.write(json.dumps(city_place_details_list, indent=4))
#     with open("data/photos.json", "w") as fp:
#         fp.write(json.dumps(photo_list, indent=4))
#     with open("data/reviews.json", "w") as fp:
#         fp.write(json.dumps(review_list, indent=4))

# with open("errors.txt", "w") as fp:
#     fp.write("\n".join(errors))
