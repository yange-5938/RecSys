import text_similarity
import demographic_info_score

def total_score(user_age, user_gender, user_text, city):
    cs = text_similarity.calculate_score(user_text, city) #returns a list of all POI_text_scores
    av = av_rating_score_per_POI #implemented by Anil??
    norm = norm_popularity_score #implemented by Anil??
    demo = demographic_info_score.demographic_info_score(user_age, user_gender, city) #returns a list of all POIs_demogr_score

    return 0.6*cs + 0.1*av + 0.1*norm + 0.2*demo 