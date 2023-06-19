import { HOST_HELLO_WORLD, HEADERS, HOST } from "../common/constants";
import { HOST_USER } from "../common/constants";
//import axios from "axios";

//HOST_HELLO_WORLD;


export async function getHelloWorld() {
  return await fetch(HOST_HELLO_WORLD, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}

export async function loginUser(id){
  try {
    return await fetch(HOST_USER + id, {
      method: 'GET',
      mode: 'cors',
      headers: HEADERS,
    }).then((response => response.json())).then((data) => console.log(data));
  } catch (error) {
    alert("User not found");
    window.location.reload();
  }
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