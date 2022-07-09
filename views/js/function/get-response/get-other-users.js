export async function OTHER_USERS(
  REQUEST,
  RESPONSE,
  USER_INFO,
  FRIEND_LISTS,
  FRIEND_REQUEST,
  USER_REQUEST_TO
) {
  let NOT_LISTED;
  let FILTERED_USERS = [];
  REQUEST = await fetch("/GET-OTHER-USER", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  RESPONSE = await REQUEST.json();
  for (let i in RESPONSE) {
    NOT_LISTED = true;
    for (let j in FRIEND_LISTS) {
      if (RESPONSE[i].username == FRIEND_LISTS[j].username) {
        NOT_LISTED = false;
      }
    }
    for (let k in FRIEND_REQUEST) {
      if (RESPONSE[i].username == FRIEND_REQUEST[k].username) {
        NOT_LISTED = false;
      }
    }
    for (let l in USER_REQUEST_TO) {
      if (RESPONSE[i].username == USER_REQUEST_TO[l].username) {
        NOT_LISTED = false;
      }
    }
    if (RESPONSE[i].username != USER_INFO.username && NOT_LISTED == true) {
      FILTERED_USERS.push(RESPONSE[i]);
    }
  }
  return FILTERED_USERS;
}
