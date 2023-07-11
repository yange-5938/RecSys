import {
  HOST_HELLO_WORLD,
  HOST_USER,
  HOST_CITY_INFO,
  HOST_POI_LOCATION_LIST,
  HOST_TRIP_PLAN,
  HOST_POI_LIST_BY_CITY,
  HOST_CREATE_TRIP_PLAN,
  HEADERS,
  HOST_CITY_LIST,
  HOST_USERS,
  HOST_CREATE_USER,
} from "../common/constants";

export async function getHelloWorld() {
  return await fetch(HOST_HELLO_WORLD, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}

export async function loginUser(email) {
  try {
    return await fetch(HOST_USER + email, {
      method: "GET",
      mode: "cors",
      headers: HEADERS,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    alert("User not found");
    window.location.reload();
  }
}

// list all the users 
export async function listUsers() {
  try{
    return await fetch(HOST_USERS, {
      method: "GET",
      mode: "cors",
      headers: HEADERS,
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
  } catch (error) {
    alert("Something went wrong")
  }
}

// create a new user 
export async function registerUser(email, password, age, gender) {

  const data = {
    email: email,
    password: password,
    age: age,
    gender: gender,
    trip_ids: []
  };

  return fetch(HOST_CREATE_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}



// loginUser() using axios{
//
/*
export async function loginUser2(){
  return     axios
  .get("http://localhost:8000/user/647606e7e3500e43856c4231")
  .then((res) => {
    console.log(res.data);
  })
  .catch(function (error) {
    console.log(error.toJSON());
  });}
*/

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

export async function getCityList() {
  return await fetch(`${HOST_CITY_LIST}`, {
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
