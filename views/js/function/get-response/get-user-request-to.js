import { GET_USER_INFO } from "./get-user-info.js";

export async function GET_USER_REQUEST_TO(REQUEST, RESPONSE, USER_INFO) {
  let REQUEST_SENT_TO = [];
  REQUEST = await fetch("/GET-USER-REQUEST-TO", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      username: USER_INFO.username,
    },
  });
  RESPONSE = await REQUEST.json();

  //SET NOTIFICATION.
  if (RESPONSE.length != 0) {
    let BUTTON_REQUEST = document.getElementsByClassName("BUTTON-PENDING")[0];
    let NOTIFICATION = document.createElement("p");

    //SET PROPERTIES.
    NOTIFICATION.innerText = RESPONSE.length;
    NOTIFICATION.className =
      "badge bg-danger text-wrap mb-0 mx-1 rounded-circle";

    //APPEND ELEMENT.
    BUTTON_REQUEST.appendChild(NOTIFICATION);
  }

  return GET_USER_INFO(RESPONSE, REQUEST_SENT_TO);
}
