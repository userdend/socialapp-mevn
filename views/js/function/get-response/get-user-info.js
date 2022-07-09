export async function GET_USER_INFO(RESPONSE, USER) {
  let SEND_REQUEST;
  let GET_RESPONSE;
  for (const index in RESPONSE) {
    SEND_REQUEST = await fetch("/GET-USER-INFO", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: RESPONSE[index],
      },
    });
    GET_RESPONSE = await SEND_REQUEST.json();
    USER.push(GET_RESPONSE[0]);
  }
  return USER;
}
