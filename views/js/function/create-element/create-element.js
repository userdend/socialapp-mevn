import { CREATE_ELEMENT_FRIEND_REQUEST } from "./element/friend-request.js";
import { CREATE_ELEMENT_USER_REQUEST_TO } from "./element/user-request-to.js";
import { CREATE_ELEMENT_OTHER_USER } from "./element/other-user.js";
import { CREATE_ELEMENT_POST } from "./element/post.js";

export function CREATE_ELEMENT(
  REQUEST,
  RESPONSE,
  GET_DIV,
  GROUP,
  USER_INFO,
  IDENTIFIER
) {
  for (let i in GROUP) {
    //CREATE ELEMENT.
    let CHILD_DIV = document.createElement("div");
    let CHILD_CHILD_DIV = document.createElement("div");
    let IMG_USER = document.createElement("img");
    let LABEL_USERNAME = document.createElement("a");
    let BUTTON_DIV = document.createElement("span");

    //INITIALIZE CHILD PROPERTIES.
    CHILD_DIV.className =
      "d-flex justify-content-between border border-5 p-1 m-1";
    CHILD_CHILD_DIV.className = "d-flex align-items-start m-1";

    //CREATE ICON.
    let ICON = document.createElement("i");
    let ICON1 = document.createElement("i");

    if (IDENTIFIER == 2) {
      CREATE_ELEMENT_FRIEND_REQUEST(
        REQUEST,
        ICON,
        ICON1,
        GROUP[i],
        USER_INFO,
        BUTTON_DIV
      );
    }

    if (IDENTIFIER == 3) {
      CREATE_ELEMENT_USER_REQUEST_TO(
        REQUEST,
        ICON,
        GROUP[i],
        USER_INFO,
        BUTTON_DIV
      );
    }

    if (IDENTIFIER == 4) {
      CREATE_ELEMENT_OTHER_USER(REQUEST, ICON, GROUP[i], USER_INFO, BUTTON_DIV);
    }

    //APPEND ELEMENT.
    CHILD_CHILD_DIV.appendChild(IMG_USER);
    CHILD_CHILD_DIV.appendChild(LABEL_USERNAME);

    if (IDENTIFIER == 5) {
      CREATE_ELEMENT_POST(
        REQUEST,
        RESPONSE,
        GROUP[i],
        BUTTON_DIV,
        CHILD_DIV,
        CHILD_CHILD_DIV,
        USER_INFO
      );
    }

    IMG_USER.alt = GROUP[i].user_img;
    IMG_USER.src = "./img/" + GROUP[i].user_img + ".jpg";
    IMG_USER.style.width = "50px";
    IMG_USER.style.height = "50px";
    IMG_USER.className = "rounded-circle border border-5";
    LABEL_USERNAME.innerText = GROUP[i].username;
    LABEL_USERNAME.href = "/user/" + GROUP[i].username;
    LABEL_USERNAME.className =
      "badge bg-primary text-wrap text-decoration-none mx-1";

    //APPEND ELEMENT.
    CHILD_DIV.appendChild(CHILD_CHILD_DIV);
    CHILD_DIV.appendChild(BUTTON_DIV);
    GET_DIV.appendChild(CHILD_DIV);
  }
}
