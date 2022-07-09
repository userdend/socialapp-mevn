export async function GET_POST(REQUEST, RESPONSE) {
  let POSTS = [];
  REQUEST = await fetch("/GET-POSTS", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  RESPONSE = await REQUEST.json();
  for (let index in RESPONSE) {
    POSTS.push(RESPONSE[index]);
  }
  return POSTS;
}
