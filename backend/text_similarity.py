import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import json
# from main import get_poi_list_by_city # to use the endpoint in order to get the length of the POI_list per city

model = SentenceTransformer('sentence-transformers/paraphrase-MiniLM-L6-v2')

def calculate_review_similarity_score(city, user_text): 
    query_embedding = model.encode(user_text, convert_to_tensor=True)
    
    with open(f'data/{city}_review_embeddings.pkl', 'rb') as f:
        review_embeddings = np.array(pickle.load(f))
    # review_sim_scores = [util.cos_sim(query_embedding, review_vector_avg) \
    #     for review_vector_avg in review_embeddings] 
    
    review_sim_scores = cosine_similarity(review_embeddings, query_embedding.numpy().reshape(1,-1))
    return review_sim_scores.flatten() #list of all POI_text_scores


def save_review_vector_avg(city, poi_list_of_city):
    with open("data/reviews_en.json") as file:
        review_data = json.load(file)
    review_vector = 0
    review_vector_avg = 0
    POI_embeddings = []
    for n in range(len(poi_list_of_city)): 
        POI_id = poi_list_of_city[n]["place_id"] #data is a dict created from the json file of the city
        number_of_api_reviews_per_POI = len(review_data[POI_id]["api_reviews"])
        number_of_scraper_reviews_per_POI = len(review_data[POI_id]["scraper_reviews"])

        reviews = []
        # converting the api_reviews into vectors
        for r in range(number_of_api_reviews_per_POI): #how many api reviews per POI?
            # check if there is an english review
            if "text_en" in review_data[POI_id]["api_reviews"][r].keys(): 
                rev = review_data[POI_id]["api_reviews"][r]["text_en"]
                if rev is not None:
                    reviews.append(rev)
            else: # if the original review has already been in english
                rev = review_data[POI_id]["api_reviews"][r]["text"]
                if rev is not None:
                    reviews.append(rev)

        # same for scraper_reviews
        for r in range(number_of_scraper_reviews_per_POI): #how many scraper reviews per POI?
            if "review_text_en" in review_data[POI_id]["scraper_reviews"][r].keys(): 
                rev = review_data[POI_id]["scraper_reviews"][r]["review_text_en"]
                try:
                    if rev is not None:
                        reviews.append(rev)
                except:
                    continue
            else:
                try: 
                    rev = review_data[POI_id]["api_reviews"][r]["review_text"]
                    if rev is not None:
                        reviews.append(rev)
                except:
                    continue
        reviews_embedding = model.encode(reviews, convert_to_tensor=True) # converting the review into a vector
        poi_reviews_embed = np.mean(reviews_embedding.numpy(), axis=0) # averaging of the vectors
        POI_embeddings.append(poi_reviews_embed)
    with open(f'data/{city}_review_embeddings.pkl', 'wb') as f:
        pickle.dump(POI_embeddings, f)
        

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