import numpy as np
from deep_translator import GoogleTranslator

def get_translated(s):
    return GoogleTranslator(source='auto', target='en').translate(s)

def compare_place_names(place_name, extracted_place_name):
    if extracted_place_name.lower() in place_name.lower():
        return True
    elif get_translated(extracted_place_name.lower()) in place_name.lower():
        return True
    elif extracted_place_name.lower() in get_translated(place_name.lower()):
        return True
    elif get_translated(extracted_place_name.lower()) in get_translated(place_name.lower()):
        return True
    else:
        return False
        
    

def get_poi_score(poi_list, entity_dict): #input: POI_list, entity_extraction_dict
    extracted_poi_list = entity_dict["poi_list"]
    OHE_POI_list = []
    poi_score = [1 if p["name"] in extracted_poi_list else 0 for p in poi_list]
    return np.array(poi_score) #output: one-hot-encoding of POI_list

