export function CREATE_ELEMENT_USER_REQUEST_TO(
  REQUEST,
  ICON,
  GROUP_INDEX,
  USER_INFO,
  BUTTON_DIV
) {
  //CREATE ELEMENT.
  let BUTTON = document.createElement("button");

  //SET PROPERTIES.
  ICON.className = "fa-solid fa-user-minus";
  BUTTON.appendChild(ICON);
  BUTTON.className = "btn btn-warning btn-sm";

  //FUNCTIONALITY.
  BUTTON.onclick = function () {
    REQUEST = fetch("/CANCEL-REQUEST", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "request-by": USER_INFO.username,
        "request-to": GROUP_INDEX.username,
      },
    });
    BUTTON.disabled = true;
    window.location.reload();
  };

  //APPEND ELEMENT.
  BUTTON_DIV.appendChild(BUTTON);
}
