import { GET_USER_INFO } from "./get-user-info.js";

export async function GET_FRIEND_LISTS(REQUEST, RESPONSE, USER_INFO) {
  let FRIENDS = [];
  REQUEST = await fetch("/GET-FRIEND-LISTS", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      username: USER_INFO.username,
    },
  });
  RESPONSE = await REQUEST.json();
  return GET_USER_INFO(RESPONSE, FRIENDS);
}
