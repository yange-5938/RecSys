from numpy import np

def get_poi_score(poi_list, entity_dict): #input: POI_list, entity_extraction_dict
    extracted_poi_list = entity_dict["poi_list"]
    OHE_POI_list = []
    poi_score = [1 if p["name"] in extracted_poi_list else 0 for p in poi_list]
    return np.array(poi_score) #output: one-hot-encoding of POI_list

