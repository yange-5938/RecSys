import numpy as np

def get_rating_popularity_score(poi_list):
    ratings = [elt["rating"] for elt in poi_list]
    user_ratings_totals = [elt["user_ratings_total"] for elt in poi_list]
    max_user_ratings_total = max(user_ratings_totals)
    popularity_score = np.array(user_ratings_totals) / max_user_ratings_total
    rating_score = np.array(ratings) / 5.0
    return popularity_score, rating_score