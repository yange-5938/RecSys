from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional, List

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class CityModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    lat: float = Field(...)
    lon: float = Field(...)
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    # username: str = Field(...)
    first_name: str = Field(...)
    last_name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    age: int = Field(...)
    gender: str = Field(...)
    trip_ids: List = Field(...,nullable=True)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Example User",
                "email": "anil.kul@tum.de",
                "password":"ak1234",
                "age": 24,
                "gender": "male",
                "trip_ids": []
            }
        }
        
class UpdateUserModel(BaseModel):
    # username: Optional[str] = Field(...)
    email: Optional[str] = Field(...)
    age: Optional[int] = Field(...)
    gender: Optional[str] = Field(...)
    trip_ids: Optional[List] = Field(...)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class PoiModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    formatted_address: str = Field(...)
    geometry: dict = Field(...)
    icon: str = Field(...)
    name: str = Field(...)
    place_id: str = Field(...)
    rating: float = Field(...)
    url: str = Field(...)
    user_ratings_total: int = Field(...)
    city: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class TripModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    city: str = Field(...)
    poi_ids: List = Field(...)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        
class PoiIdListModel(BaseModel):
    poi_id_list: List = Field(...)

class RecommendationParamsModel(BaseModel):
    city: str = Field(...)
    user_text: str = Field(...)
    user_age: int = Field(...)
    user_gender: int = Field(...)
    
def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }