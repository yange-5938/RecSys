import { HOST_HELLO_WORLD, HEADERS } from "../common/constants";

HOST_HELLO_WORLD;

export async function getHelloWorld() {
  return await fetch(HOST_HELLO_WORLD, {
    method: `GET`,
    mode: `cors`,
    headers: HEADERS,
  }).then((response) => response.json());
}
