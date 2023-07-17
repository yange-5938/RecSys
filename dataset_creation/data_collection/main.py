import os
from scraper import scrape_google_reviews, initialize_scraper
from html_parser import extract_reviews_from_html, get_poi_list, get_poi_details
import time
import random
import json
from tqdm import tqdm

def generate_html_output_path(city, place_name):
    city_html_path = os.path.join("data", "html", city)
    os.makedirs(city_html_path, exist_ok=True)
    place_name = "_".join(place_name.split(" "))
    place_name += ".html"
    return os.path.join(city_html_path, place_name)

def get_poi_details_output_path(city, place_name):
    city_poi_path = os.path.join("data", "poi_details", city)
    os.makedirs(city_poi_path, exist_ok=True)
    place_name = "_".join(place_name.split(" "))
    place_name += ".json"
    return os.path.join(city_poi_path, place_name)
    
def save_poi_details(driver, city, place_name):
    poi_html_path = generate_html_output_path(city, place_name)
    scrape_google_reviews(driver, place_name, poi_html_path)
    reviews = extract_reviews_from_html(poi_html_path)
    time.sleep(random.uniform(10,30))
    return reviews

if __name__ == "__main__":
    driver = initialize_scraper()
    city_list = ["rome", "vienna"]
    for city in city_list:
        city_poi_list = get_poi_list(os.path.join("city_places_to_go", city + ".html"))
        errors = ""
        for poi_html_card in tqdm(city_poi_list):
            poi_details_dct = get_poi_details(poi_html_card)
            poi_name = poi_details_dct["name"]
            poi_details_output_path = get_poi_details_output_path(city, poi_name)
            if os.path.isfile(poi_details_output_path):
                continue
            else:
                try:
                    poi_reviews = save_poi_details(driver, city, poi_name)
                    poi_details_dct["reviews"] = poi_reviews
                    dct_str = json.dumps(poi_details_dct, indent=4)
                    with open(poi_details_output_path, "w") as fp:
                        fp.write(dct_str)
                except:
                    errors += f"{city}, {poi_name}\n"
        with open(f"errors/errors_{city}.txt", "w") as fp:
            fp.write(errors)
        time.sleep(random.uniform(45,60))