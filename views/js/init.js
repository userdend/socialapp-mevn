import { GET_FRIEND_LISTS } from "./function/get-response/get-friend-lists.js";
import { GET_FRIEND_REQUEST } from "./function/get-response/get-friend-request.js";
import { GET_USER_REQUEST_TO } from "./function/get-response/get-user-request-to.js";
import { OTHER_USERS } from "./function/get-response/get-other-users.js";
import { GET_POST } from "./function/get-response/get-post.js";
import { CREATE_ELEMENT } from "./function/create-element/create-element.js";

//ONLOAD.
(async function () {
  let TOKEN = await localStorage.getItem("TOKEN");
  if (TOKEN == null) {
    window.location.href = "/";
  }
  let USER_INFO = await JSON.parse(atob(TOKEN.split(".")[1]))[0];

  //SET PROFILE.
  let USER_IMG = document.getElementsByTagName("img")[0];
  let USERNAME = document.getElementsByTagName("p")[0];
  USER_IMG.alt = USER_INFO.user_img;
  USER_IMG.src = "./img/" + USER_INFO.user_img + ".jpg";
  USERNAME.innerText = USER_INFO.username;

  //SERVER PARAMETERS.
  let REQUEST;
  let RESPONSE;

  //GET USER FRIEND LISTS.
  let FRIEND_LISTS = await GET_FRIEND_LISTS(REQUEST, RESPONSE, USER_INFO);

  //GET USER FRIEND REQUEST.
  let FRIEND_REQUEST = await GET_FRIEND_REQUEST(REQUEST, RESPONSE, USER_INFO);

  //GET USER SENT REQUEST TO.
  let USER_REQUEST_TO = await GET_USER_REQUEST_TO(REQUEST, RESPONSE, USER_INFO);

  //GET OTHER USERS.
  let OTHER_USER = await OTHER_USERS(
    REQUEST,
    RESPONSE,
    USER_INFO,
    FRIEND_LISTS,
    FRIEND_REQUEST,
    USER_REQUEST_TO
  );

  //GET POSTS.
  let POST = await GET_POST(REQUEST, RESPONSE);

  //CREATE ELEMENT.
  let FRIEND_LISTS_DIV = document.getElementsByClassName("FRIEND-LISTS")[0];
  let FRIEND_REQUEST_DIV = document.getElementsByClassName("FRIEND-REQUEST")[0];
  let REQUEST_SENT_TO_DIV =
    document.getElementsByClassName("REQUEST-SENT-TO")[0];
  let OTHER_USER_DIV = document.getElementsByClassName("OTHER-USERS")[0];
  let POSTS_DIV = document.getElementsByClassName("POSTS")[0];

  await CREATE_ELEMENT(
    REQUEST,
    RESPONSE,
    FRIEND_LISTS_DIV,
    FRIEND_LISTS,
    USER_INFO,
    1
  );

  await CREATE_ELEMENT(
    REQUEST,
    RESPONSE,
    FRIEND_REQUEST_DIV,
    FRIEND_REQUEST,
    USER_INFO,
    2
  );

  await CREATE_ELEMENT(
    REQUEST,
    RESPONSE,
    REQUEST_SENT_TO_DIV,
    USER_REQUEST_TO,
    USER_INFO,
    3
  );

  await CREATE_ELEMENT(
    REQUEST,
    RESPONSE,
    OTHER_USER_DIV,
    OTHER_USER,
    USER_INFO,
    4
  );

  await CREATE_ELEMENT(REQUEST, RESPONSE, POSTS_DIV, POST, USER_INFO, 5);
})();
