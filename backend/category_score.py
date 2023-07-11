import numpy as np
entity_list = ["History", "Museums", "Nature", "Architecture", "Culture", "Theme Parks", 
               "Beaches", "Wildlife", "Adventure", "Religion", "Food", "Shopping", "Gardens", 
               "Sport", "Science", "Wineries", "Festivals", "Scenic Views", "Caves", "Music", 
               "Theatre", "Music", "Waterfalls", "Botanical", "Zoo", "Castle", "Spa", 
               "Amusement Park", "Wine Yard", "Heritage", "Lakeside", "River", "Ancient", 
               "Art Gallery", "Church", "Mosque" ]

def get_category_score(poi_list, entity_dict):    
    extracted_categories = entity_dict["category"]
    OHE_entity_list = []
    output_list = [] #output_list: each element is sum of OHE per POI
    
    category_score = []
    for poi in poi_list:
        poi_category_score = [1 if e_c in poi["categories"] else 0 for e_c in extracted_categories]
        category_score.append(sum(poi_category_score))
    category_score = np.array(category_score)
    if max(category_score) != 0:
        category_score = category_score / max(category_score) # for normalizing between 0-1
    return category_score
    