def get_demographic_info_score(demographics_data, review_data, user_age, 
                           user_gender, poi_list_of_city):
    count = 0 
    author_age = 0 
    author_gender = 0
    POIs_demogr_score = []

        
    for n in range(len(poi_list_of_city)): 
        POI_id = poi_list_of_city[n]["place_id"] #data is a dict created from the json file of the city
        number_of_api_reviews_per_POI = len(review_data[POI_id]["api_reviews"])
        number_of_scraper_reviews_per_POI = len(review_data[POI_id]["scraper_reviews"])

        for r in range(number_of_scraper_reviews_per_POI): #how many reviews per POI?
            author_ID = review_data[POI_id]["scraper_reviews"][r]["author_id"] # the api_reviews dont't have an author_id, only author name :(
            if author_ID in demographics_data:
                author_age += demographics_data[author_ID]["age"]
                author_gender += demographics_data[author_ID]["gender"]
                count += 1
        
        av_age = author_age/count
        av_gender = author_gender/count

        age_score = 1/(abs(user_age-av_age)+1)
        gender_score =1/(abs(user_gender-av_gender)+1)

        demogr_score = age_score * gender_score
        POIs_demogr_score.append(demogr_score)

    return POIs_demogr_score