let POSTS = document.getElementsByClassName("POSTS")[0];
let FRIENDS = document.getElementsByClassName("FRIEND-LISTS")[0];
let REQUEST = document.getElementsByClassName("FRIEND-REQUEST")[0];
let PENDING = document.getElementsByClassName("REQUEST-SENT-TO")[0];
let PEOPLE = document.getElementsByClassName("OTHER-USERS")[0];
let DIV = [POSTS, FRIENDS, REQUEST, PENDING, PEOPLE];

function SET_DISPLAY(i) {
  DIV[i].style.display = "block";
  for (let index in DIV) {
    if (index != i) {
      DIV[index].style.display = "none";
    }
  }
}
