from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
import motor.motor_asyncio
from typing import List
import yaml
from fastapi.middleware.cors import CORSMiddleware
from models import CityModel, UserModel, PoiModel, TripModel, PoiIdListModel,\
    ResponseModel, UpdateUserModel, RecommendationParamsModel
from route_optimizer import optimize
from total_score import get_total_score
from text_similarity import save_review_vector_avg

with open("credentials.yaml", 'r') as fp:
    credentials = yaml.safe_load(fp)

app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(credentials["mongo-url"])
db = client.rs_system_db

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get(
    "/city-list", response_description="List all city names in the database", response_model=List[CityModel]
)
async def get_city_list():
    city_list = await db["cities"].find().to_list(1000)
    return city_list

@app.get(
    "/city-info/{city_name}", response_description="Get city info by city name.", response_model=CityModel
)
async def get_city_info(city_name: str):
    city_info = await db["cities"].find_one({"name": city_name})
    return city_info


@app.get(
    "/poi-list/{city}", response_description="List all pois in the given city", response_model=List[PoiModel]
)
async def get_poi_list_by_city(city: str):
    poi_list = await db["poi"].find({"city": city}).sort("_id").to_list(1000)
    return poi_list

@app.get(
    "/poi/{id}", response_description="Get POI by id.", response_model=PoiModel
)
async def get_poi_by_id(id: str):
    poi = await db["poi"].find_one({"_id": ObjectId(id)})
    return poi

@app.post(
    "/poi-locations", response_description="Get list of lat, lon of given POI list."
)
async def get_poi_location_list(req: PoiIdListModel = Body (...)):
    poi_ids = req.poi_id_list
    response = []
    for poi_id in poi_ids:
        poi_obj = await get_poi_by_id(poi_id)
        del poi_obj["_id"]
        response.append(poi_obj)
    return response
        


# Endpoint for listing all the users in the database
@app.get(
    "/users", response_description="List all users", response_model=List[UserModel]
)
async def list_users():
    users = await db["users"].find().to_list(1000)
    return users

# Endpoing for getting a user by email
@app.get(
    "/user/{email}", response_description="Get user by email.", response_model=UserModel
)
async def get_user_by_email(email: str):
    user = await db["users"].find_one({"email": email})
    if not user:
        print('user not found, use standard user')
        user = await db["users"].find_one({"email": "anil.kul@tum.de"})
    return user

# Endpoint for creating a new user
@app.post("/user/create", response_description="Add new user", response_model=UserModel)
async def create_user(user: UserModel = Body(...)):
    user.id = ObjectId(user.id)
    user = jsonable_encoder(user)
    user["_id"] = ObjectId(user["_id"])
    new_user = await db["users"].insert_one(user)
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})
    return created_user

# update user by id
@app.put(
    "/user/{id}", response_description="Update user by id."
)
async def update_user_by_id(id: str, body: dict):
    update_user = {k: v for k, v in body.items() if v is not None}
    user = await db["users"].find_one({"_id": ObjectId(id)})
    for k in list(user.keys()):
        if k != "_id" and k not in update_user.keys():
            update_user[k] = user[k]
    updated_user = await db["users"].update_one({"_id": ObjectId(id)}, {"$set": update_user})
    if updated_user:
        return {"message": f"User with id: {id} is updated successfully!"}
    else:
        return {"message": f"User with id: {id} could not updated!"}

@app.put(
    "/user/{user_id}/add-trip-plan", response_description="Update user by id."
)
async def add_trip_plan_to_user(user_id: str, trip_plan_id: str):
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    await update_user_by_id(user_id, {"trip_ids": user["trip_ids"] + [trip_plan_id]})

@app.get(
    "/trip-plan/{trip_plan_id}", response_description="Get trip plan by ID.", response_model=TripModel
)
async def get_trip_plan(trip_plan_id: str):
    trip_plan = await db["trips"].find_one({"_id": ObjectId(trip_plan_id)})
    return trip_plan

@app.post(
    "/trip-plan/create/{user_id}", response_description="Create trip plan with user ID"
)
async def create_trip_plan(user_id: str, req: PoiIdListModel = Body (...)):
    
    poi_info_list = []
    poi_ids = req.poi_id_list
    for poi_id in poi_ids:
        poi_info = await get_poi_by_id(poi_id)
        city = poi_info["city"]
        poi_info_list.append(poi_info)
    location_indices_ordered = optimize(poi_info_list)
    optimized_poi_ids = [poi_ids[i] for i in location_indices_ordered]
    trip_plan_dct = {"city": city,
                     "poi_ids": optimized_poi_ids}
    encoded_dct = jsonable_encoder(trip_plan_dct)
    trip_plan = await db["trips"].insert_one(encoded_dct)
    
    await add_trip_plan_to_user(user_id, trip_plan.inserted_id)
    return ResponseModel({"tripPlanId": str(trip_plan.inserted_id)}, "Trip plan created successfully")

@app.get(
    "/rating-popularity-score/{city}", response_description="Get rating and popularity score list for corresponding city"
)
async def get_rating_popularity_score(city: str):
    poi_list = await get_poi_list_by_city(city)
    ids = [str(elt["_id"]) for elt in poi_list]
    ratings = [elt["rating"] for elt in poi_list]
    user_ratings_totals = [elt["user_ratings_total"] for elt in poi_list]
    return {k: {"rating_score": r / 5.0, "popularity_score": u / max(user_ratings_totals)} for k, r, u in zip (ids, ratings, user_ratings_totals)}

@app.post(
    "/get-recommended-poi-list", response_description="Get poi list in recommended order"
)
async def get_recommended_poi_list(params: RecommendationParamsModel = Body (...)):
    city = params.city
    user_text = params.user_text
    user_age = params.user_age
    user_gender = params.user_gender
    poi_list = await get_poi_list_by_city(city)
    poi_scores = get_total_score(city, user_age, user_gender, user_text, poi_list)
    pairs = zip(poi_list, poi_scores)
    sorted_pairs = sorted(pairs, key=lambda x: x[1]) #sort according to scores
    sorted_list_poi_list, _ = zip(*sorted_pairs) #unpack the pairs
    for poi in sorted_list_poi_list:
        poi["_id"] = str(poi["_id"])
    return sorted_list_poi_list

@app.get(
    "/save-review-embeddings/{city}", response_description="Save reviews text embeddings for corresponding city"
)
async def get_rating_popularity_score(city: str):
    poi_list = await get_poi_list_by_city(city)
    save_review_vector_avg(city, poi_list)
    return ResponseModel(city, "Review embeddings saved!")