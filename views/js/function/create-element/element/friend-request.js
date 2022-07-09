export function CREATE_ELEMENT_FRIEND_REQUEST(
  REQUEST,
  ICON,
  ICON1,
  GROUP_INDEX,
  USER_INFO,
  BUTTON_DIV
) {
  //CREATE ELEMENT.
  let ACCEPT_BUTTON = document.createElement("button");
  let DECLINE_BUTTON = document.createElement("button");

  //SET PROPERTIES.
  ICON.className = "fa-solid fa-user-check";
  ACCEPT_BUTTON.appendChild(ICON);
  ACCEPT_BUTTON.className = "btn btn-success mx-1";

  ICON1.className = "fa-solid fa-user-xmark";
  DECLINE_BUTTON.appendChild(ICON1);
  DECLINE_BUTTON.className = "btn btn-danger";

  //FUNCTIONALITY.
  ACCEPT_BUTTON.onclick = function () {
    REQUEST = fetch("/ACCEPT-REQUEST", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "request-by": GROUP_INDEX.username,
        "request-to": USER_INFO.username,
      },
    });
    ACCEPT_BUTTON.disabled = true;
    DECLINE_BUTTON.disabled = true;
    window.location.reload();
  };

  DECLINE_BUTTON.onclick = function () {
    REQUEST = fetch("/DECLINE-REQUEST", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "request-by": GROUP_INDEX.username,
        "request-to": USER_INFO.username,
      },
    });
    ACCEPT_BUTTON.disabled = true;
    DECLINE_BUTTON.disabled = true;
    window.location.reload();
  };

  //APPEND ELEMENT.
  BUTTON_DIV.appendChild(ACCEPT_BUTTON);
  BUTTON_DIV.appendChild(DECLINE_BUTTON);
}
