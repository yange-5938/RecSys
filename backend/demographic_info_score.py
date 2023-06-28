import json 
import author_demographics.json

with open(author_demographics.json) as file:
    demographics_data = json.load(file)

with open("reviews_en.json") as file:
    review_data = json.load(file)

def demographic_info_score(POI_id, author_ID, user_age, user_gender):
    count, author_age, author_gender = 0
    
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

    age_score = 1/(user_age - av_age)
    gender_score =1/(user_gender - av_gender)


    return age_score * gender_score



