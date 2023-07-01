import json 
import main
import asyncio
import author_demographics.json

with open(author_demographics.json) as file:
    demographics_data = json.load(file)

with open("reviews_en.json") as file:
    review_data = json.load(file)



def demographic_info_score(user_age, user_gender, city):
    count, author_age, author_gender = 0
    POIs_demogr_score = []

    # Create an event loop
    loop = asyncio.get_event_loop()
    # Call the async function and run it in the event loop
    number_of_POIs_per_city = loop.run_until_complete(len(main.get_poi_list_by_city(city)))
    # Close the event loop
    loop.close()

    # read in the json file of the city
    with open(city".json") as file:
        data = json.load(file)

    for n in range(number_of_POIs_per_city): 
        POI_id = data[n]["place_id"] #data is a dict created from the json file of the city
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

        demogr_score = age_score * gender_score
        POIs_demogr_score.append(demogr_score)

    return POIs_demogr_score
