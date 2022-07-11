let NODE = document.getElementsByClassName("NODE")[0];
let PROFILE_AND_MENU = document.getElementsByClassName("PROFILE-AND-MENU")[0];

let POSTS = document.getElementsByClassName("POSTS")[0];
let FRIENDS = document.getElementsByClassName("FRIEND-LISTS")[0];
let REQUEST = document.getElementsByClassName("FRIEND-REQUEST")[0];
let PENDING = document.getElementsByClassName("REQUEST-SENT-TO")[0];
let PEOPLE = document.getElementsByClassName("OTHER-USERS")[0];
let DIV = [POSTS, FRIENDS, REQUEST, PENDING, PEOPLE];

NODE.addEventListener("click", () => {
  if (screen.width <= 600) {
    PROFILE_AND_MENU.style.left = "-50%";
    PROFILE_AND_MENU.style.boxShadow = "none";
    NODE.style.opacity = 1;
  }
});

function SET_DISPLAY(i) {
  if (screen.width <= 600) {
    PROFILE_AND_MENU.style.left = "-50%";
    PROFILE_AND_MENU.style.boxShadow = "none";
    NODE.style.opacity = 1;
  }
  DIV[i].style.display = "block";
  for (let index in DIV) {
    if (index != i) {
      DIV[index].style.display = "none";
    }
  }
}

function DISPLAY_MENU() {
  if (screen.width <= 600) {
    PROFILE_AND_MENU.style.left = "0px";
    PROFILE_AND_MENU.style.boxShadow = "7px 0px 18px -5px rgba(0, 0, 0, 0.82)";
    NODE.style.opacity = 0.5;
  }
}
