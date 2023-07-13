import numpy as np
from deep_translator import GoogleTranslator

def get_translated(s):
    return GoogleTranslator(source='auto', target='en').translate(s)

def compare_place_names(place_name, extracted_place_name_list):
    for extracted_place_name in extracted_place_name_list:
        if extracted_place_name.lower() in place_name.lower():
            return True
        elif get_translated(extracted_place_name.lower()) in place_name.lower():
            return True
        elif extracted_place_name.lower() in get_translated(place_name.lower()):
            return True
        elif get_translated(extracted_place_name.lower()) in get_translated(place_name.lower()):
            return True    
    return False
        
    

def get_poi_score(poi_list, entity_dict): #input: POI_list, entity_extraction_dict
    extracted_poi_list = [e.lower().replace(" ", "") for e in entity_dict["poi_list"]]
    database_poi_names = [p["name"].lower().replace(" ","") for p in poi_list]
    poi_score = [1 if p in extracted_poi_list else 0 for p in database_poi_names]
    return np.array(poi_score) #output: one-hot-encoding of POI_list

