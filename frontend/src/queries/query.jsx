import {
  HOST_HELLO_WORLD,
  HOST_CITY_INFO,
  HOST_POI_LOCATION_LIST,
  HOST_TRIP_PLAN,
  HOST_POI_LIST_BY_CITY,
  HOST_CREATE_TRIP_PLAN,
  HEADERS,
} from "../common/constants";

export async function getHelloWorld() {
  return await fetch(HOST_HELLO_WORLD, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}

export async function getCityInfo(city) {
  return await fetch(`${HOST_CITY_INFO}/${city}`, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}

export async function getTripPlan(trip_plan_id) {
  return await fetch(`${HOST_TRIP_PLAN}/${trip_plan_id}`, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}

export async function getPOILocationList(poiIdList) {
  return await fetch(`${HOST_POI_LOCATION_LIST}`, {
    method: `POST`,
    mode: `cors`,
    headers: HEADERS,
    body: JSON.stringify(poiIdList),
  }).then((response) => response.json());
}

export async function getPoiListByCity(city) {
  return await fetch(`${HOST_POI_LIST_BY_CITY}/${city}`, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}

export async function createTripPlan(userId, poiIdList) {
  console.log(userId, poiIdList);
  return await fetch(`${HOST_CREATE_TRIP_PLAN}/${userId}`, {
    method: `POST`,
    mode: `cors`,
    headers: HEADERS,
    body: JSON.stringify(poiIdList),
  }).then((response) => response.json());
}
