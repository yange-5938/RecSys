from sentence_transformers import SentenceTransformer, util
import asyncio
import json 
import main


from backend import main # to use the endpoint in order to get the length of the POI_list per city


def calculate_score(user_text, city="Berlin"): 
    model = SentenceTransformer('sentence-transformers/paraphrase-MiniLM-L6-v2')
    query_embedding = model.encode(user_text, convert_to_tensor=True)


    # read in the reviews file
    with open("reviews_en.json") as file:
        review_data = json.load(file)


    # Create an event loop
    loop = asyncio.get_event_loop()
    # Call the async function and run it in the event loop
    number_of_POIs_per_city = loop.run_until_complete(main.get_poi_list_by_city(city))
    # Close the event loop
    loop.close()

    review_vector = 0
    review_vector_avg = 0
    POIs_text_score = []

    for n in range(number_of_POIs_per_city): 
        POI_id = number_of_POIs_per_city[n]["place_id"] #data is a dict created from the json file of the city
        number_of_api_reviews_per_POI = len(review_data[POI_id]["api_reviews"])
        number_of_scraper_reviews_per_POI = len(review_data[POI_id]["scraper_reviews"])

        # converting the api_reviews into vectors
        for r in range(number_of_api_reviews_per_POI): #how many api reviews per POI?
            # check if there is an english review
            if review_data[POI_id]["api_reviews"][r]["text_en"]: 
                rev = review_data[POI_id]["api_reviews"][r]["text_en"]
                passage_embedding = model.encode(rev, convert_to_tensor=True) # converting the review into a vector
                review_vector += passage_embedding # sum of all vectors
            else: # if the original review has already been in english
                rev = review_data[POI_id]["api_reviews"][r]["text"]
                passage_embedding = model.encode(rev, convert_to_tensor=True) # converting the review into a vector
                review_vector += passage_embedding # sum of all vectors

        # same for scraper_reviews
        for r in range(number_of_scraper_reviews_per_POI): #how many scraper reviews per POI?
            if review_data[POI_id]["scraper_reviews"][r]["review_text_en"]: 
                rev = review_data[POI_id]["scraper_reviews"][r]["review_text_en"]
                passage_embedding = model.encode(rev, convert_to_tensor=True) # converting the review into a vector
                review_vector += passage_embedding # sum of all vectors
            else: 
                rev = review_data[POI_id]["api_reviews"][r]["review_text"]
                passage_embedding = model.encode(rev, convert_to_tensor=True) # converting the review into a vector
                review_vector += passage_embedding # sum of all vectors

        review_vector_avg = review_vector/(number_of_api_reviews_per_POI + number_of_scraper_reviews_per_POI) # averaging of the vectors
        score_per_POI = util.cos_sim(query_embedding, review_vector_avg) # score_per_POI = similarity between user_input vector and review_vector_avg
        POIs_text_score.append(score_per_POI)
    
    return POIs_text_score #list of all POI_text_scores




"""
#text from user input
user_text = 'I would like to go to Paris and visit the Eiffel tower. I am also interested in bridges, especially in evening hours since I enjoy watching the sunset. Moreover I am into classic architecture.'
query_embedding = model.encode(user_text, convert_to_tensor=True)


# example texts to compare the user input with
sentences = ["I would like to go to Paris and visit the Eiffel tower. I am also interested in bridges, especially in evening hours since I enjoy watching the sunset. Moreover I am into classic architecture.", 
             "Stunning bridge with beautiful lampposts down either side. Great views over the river siene and a lovely view of the Eiffel Tower in the distance. This is a great photo spot.", 
             "The best architecture all around. This bridge has amazing architecture on every inch and detail. During sunset this place looks even more amazing with a view to Eiffel tower and Seine river", 
             "The way the parlance is laid out in Paris makes this a little hidden gem. It gets you out of the main hustle and bustle of Paris but still able to take in history. There is plenty of grass area for picnics or to just chill out. This is the Palace that Henri II pass away.",
             "A beautiful, artistically designed, bridge. Very worth seeing, whether from the water or land. You have a very nice view of the Eiffel Tower. And on the bridge there are also very beautiful statues. From the bridge you can take nice photos of the Eiffel Tower, the Pont de la Concorde, etc. and it's not as crowded as the surrounding area.",
             "Beautiful bridge, which we looked at at the request of our daughter (fan of Find me in Paris). A lot of details make this bridge extraordinary.",
             "A beautiful spot perfect for a picnic. In whichever direction you look, the houses are very impressive. It's fun to walk around the arcades that line the square.\nIt is the oldest square in Paris and is exactly 140 x 140 m wide. Around this square are houses from the 17th century.",
             "A secret tip, behind this beautiful \"backyard\" there are many interesting arcades, original from the time of Oscar Wilde",
             "Small fine park in the middle of the city with beautiful galleries around it."]

# compute vectors
passage_embedding = model.encode(sentences, convert_to_tensor=True)

#Compute cosine-similarities
cosine_scores = util.cos_sim(query_embedding, passage_embedding)

print(f"The cosine_score is {cosine_scores}") # matrix with only one row and as many columns as cosine_scores

list1 = []
for i in range(len(cosine_scores[0])):
    list1.append({'index': i, 'score': cosine_scores[0][i]})

# Sort scores in decreasing order
list1 = sorted(list1, key=lambda x: x['score'], reverse=True)

print(list1)

# show the 4 highest scores
for score in list1[0:4]:
    i = score['index']
    print(f"user text \t\t sentence {i} \t\t Score: {score['score']}") #{score['score']}

"""