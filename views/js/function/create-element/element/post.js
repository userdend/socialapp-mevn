import { TIME_DIFFERENCE } from "../../time.js";

export function CREATE_ELEMENT_POST(
  REQUEST,
  RESPONSE,
  GROUP_INDEX,
  BUTTON_DIV,
  CHILD_DIV,
  CHILD_CHILD_DIV,
  USER_INFO
) {
  //CREATE CONTAINER FOR POST CONTENT.
  let POST_CONTENT_DIV = document.createElement("span");

  //SET PROPERTIES.
  CHILD_DIV.className = "d-flex flex-column border border-5 p-1 m-1";
  CHILD_DIV.id = GROUP_INDEX.id;
  POST_CONTENT_DIV.innerHTML = GROUP_INDEX.content + "<br />";
  BUTTON_DIV.appendChild(POST_CONTENT_DIV);

  //IMPLEMENT COMMENT FEATURE.
  let COMMENT = document.createElement("input");
  let COMMENT_BUTTON = document.createElement("button");

  //SET STYLE.
  POST_CONTENT_DIV.className = "m-1";
  COMMENT.className = "border border-3 m-1";
  COMMENT_BUTTON.className = "border border-3 mx-1";

  //SET PROPERTIES.
  COMMENT.type = "text";
  COMMENT.placeholder = "Comment";
  COMMENT.required = true;
  COMMENT_BUTTON.innerText = "Sent";
  COMMENT_BUTTON.onclick = function () {
    if (COMMENT.value.length > 0) {
      REQUEST = fetch("/SENT-COMMENT", {
        method: "GET",
        headers: {
          postid: GROUP_INDEX.id,
          comment: COMMENT.value,
          username: USER_INFO.username,
          userimg: USER_INFO.user_img,
          date_comment: new Date().getTime(),
        },
      });
      window.location.reload();
    }
  };
  BUTTON_DIV.appendChild(COMMENT);
  BUTTON_DIV.appendChild(COMMENT_BUTTON);

  //TIME POSTED.
  let TIME_POSTED = document.createElement("a");
  //TIME_POSTED.innerText = GROUP_INDEX.date_posted.split(".")[0];
  TIME_POSTED.innerText = TIME_DIFFERENCE(GROUP_INDEX.date_posted);
  TIME_POSTED.className =
    "DATE-POSTED badge bg-secondary text-wrap text-decoration-none mx-1";

  //APPEND ELEMENT.
  CHILD_CHILD_DIV.appendChild(TIME_POSTED);

  if (GROUP_INDEX.username == USER_INFO.username) {
    //CREATE DELETE BUTTON.
    let DELETE_BUTTON = document.createElement("a");

    //SET BUTTON PROPERTIES.
    DELETE_BUTTON.innerText = "Delete";
    DELETE_BUTTON.className =
      "DELETE-POST badge bg-danger text-wrap text-decoration-none mx-1";

    //DELETE BUTTON FUNCTIONALITY.
    DELETE_BUTTON.onclick = function () {
      REQUEST = fetch("/DELETE-POST", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          postid: GROUP_INDEX.id,
        },
      });
      window.location.reload();
    };

    //APPEND ELEMENT.
    CHILD_CHILD_DIV.appendChild(DELETE_BUTTON);
  }

  //GET ALL THE COMMENT FOR THIS POST.
  (async function () {
    REQUEST = await fetch("/GET-COMMENTS", {
      method: "GET",
      headers: {
        postid: GROUP_INDEX.id,
      },
    });
    RESPONSE = await REQUEST.json();
    for (let i in RESPONSE) {
      //CREATE CONTAINER.
      let COMMENT_DIV = document.createElement("div");
      let COMMENTATOR_DIV = document.createElement("div");
      let COMMENT_CONTENT = document.createElement("span");

      //COMMENTATOR DETAIL.
      let COMMENTATOR_IMG = document.createElement("img");
      let COMMENTATOR_NAME = document.createElement("a");
      let COMMENT_DATE = document.createElement("span");

      //SET COMMENTATOR PROPERTIES.
      COMMENTATOR_IMG.src = "./img/" + RESPONSE[i].user_img + ".jpg";
      COMMENTATOR_NAME.href = "/user/" + RESPONSE[i].username;
      COMMENTATOR_NAME.innerText = RESPONSE[i].username;
      COMMENT_DATE.innerText = TIME_DIFFERENCE(RESPONSE[i].date_comment);

      //SET CONTAINER PROPERTIES.
      COMMENT_DIV.id = RESPONSE[i].id;

      //SET CONTAINER STYLE.
      COMMENT_DIV.className = "border border-5 p-1 m-1";

      //SET COMMENTATOR STYLE.
      COMMENTATOR_IMG.style.width = "40px";
      COMMENTATOR_IMG.style.height = "40px";
      COMMENTATOR_IMG.className = "rounded-circle border border-5";
      COMMENTATOR_NAME.className =
        "badge bg-info text-wrap text-decoration-none mx-1 cursor-pointer";
      COMMENT_DATE.className =
        "badge bg-secondary text-wrap text-decoration-none mx-1";

      //SET COMMENT CONTENT.
      COMMENT_CONTENT.innerText = RESPONSE[i].comment;

      //APPEND ELEMENT.
      COMMENTATOR_DIV.appendChild(COMMENTATOR_IMG);
      COMMENTATOR_DIV.appendChild(COMMENTATOR_NAME);
      COMMENTATOR_DIV.appendChild(COMMENT_DATE);

      //CHECK IF USER OWNS A COMMENT.
      if (RESPONSE[i].username == USER_INFO.username) {
        let DELETE_COMMENT = document.createElement("a");
        DELETE_COMMENT.innerText = "X";
        DELETE_COMMENT.className =
          "DELETE-COMMENT badge bg-danger text-wrap text-decoration-none mx-1";
        DELETE_COMMENT.onclick = function () {
          REQUEST = fetch("/DELETE-COMMENT", {
            method: "GET",
            headers: {
              commentid: COMMENT_DIV.id,
            },
          });
          window.location.reload();
        };
        COMMENTATOR_DIV.appendChild(DELETE_COMMENT);
      }

      //APPEND ELEMENT.
      COMMENT_DIV.appendChild(COMMENTATOR_DIV);
      COMMENT_DIV.appendChild(COMMENT_CONTENT);
      BUTTON_DIV.appendChild(COMMENT_DIV);
    }
  })();
}
