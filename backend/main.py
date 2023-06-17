from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
import motor.motor_asyncio
from typing import List
import yaml
from fastapi.middleware.cors import CORSMiddleware
from models import CityModel, UserModel, PoiModel, TripModel, PoiIdListModel,\
    ResponseModel, UpdateUserModel
from route_optimizer import optimize


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
    poi_list = await db["poi"].find({"city": city}).to_list(1000)
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
        response.append({"place_name": poi_obj["name"],
                         "google_place_id": poi_obj["place_id"], 
                         "lat": poi_obj["geometry"]["location"]["lat"], 
                         "lon": poi_obj["geometry"]["location"]["lng"]})
    return response
        

@app.get(
    "/user/{id}", response_description="Get user by id.", response_model=UserModel
)
async def get_user_by_id(id: str):
    user = await db["users"].find_one({"_id": ObjectId(id)})
    return user

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
    optimized_poi_ids = [list(poi_ids)[i] for i in location_indices_ordered]
    trip_plan_dct = {"city": city,
                     "poi_ids": optimized_poi_ids}
    encoded_dct = jsonable_encoder(trip_plan_dct)
    trip_plan = await db["trips"].insert_one(encoded_dct)
    await add_trip_plan_to_user(user_id, trip_plan.inserted_id)
    return ResponseModel("trip_plan", "Trip plan created successfully")

@app.get(
    "/rating-popularity-score/{city}", response_description="Get rating and popularity score list for corresponding city"
)
async def get_rating_popularity_score(city: str):
    poi_list = await get_poi_list_by_city(city)
    ids = [str(elt["_id"]) for elt in poi_list]
    ratings = [elt["rating"] for elt in poi_list]
    user_ratings_totals = [elt["user_ratings_total"] for elt in poi_list]
    return {k: {"rating_score": r / 5.0, "popularity_score": u / max(user_ratings_totals)} for k, r, u in zip (ids, ratings, user_ratings_totals)}
