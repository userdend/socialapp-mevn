export function CREATE_ELEMENT_OTHER_USER(
  REQUEST,
  ICON,
  GROUP_INDEX,
  USER_INFO,
  BUTTON_DIV
) {
  //CREATE ELEMENT.
  let BUTTON = document.createElement("button");

  //SET PROPERTIES.
  ICON.className = "fa-solid fa-user-plus";
  BUTTON.appendChild(ICON);
  BUTTON.className = "btn btn-primary btn-sm";

  //FUNCTIONALITY.
  BUTTON.onclick = function () {
    REQUEST = fetch("/ADD-FRIEND", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "request-by": USER_INFO.username,
        "request-to": GROUP_INDEX.username,
      },
    });
    BUTTON.disabled = true;
    window.location.reload();

    // //jQuery.
    // $.ajax({
    //   url: "/ADD-FRIEND",
    //   method: "GET",
    //   contentType: "application/json",
    //   headers: {
    //     "request-by": USER_INFO.username,
    //     "request-to": GROUP_INDEX.username,
    //   },
    //   success: function (data) {},
    //   error: function (data) {
    //     console.log(data);
    //   },
    // });
    // //jQuery.
  };

  //APPEND ELEMENT.
  BUTTON_DIV.appendChild(BUTTON);
}
