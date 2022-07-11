const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//SETUP DATABASE CONNECTION.
let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "socialapp",
  });
}

//CONNECT TO DATABASE.
connection.connect((error) => {
  if (error) throw error;
});

//SET MIDDLEWARE.
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

//ONLOAD.
app.get("/", (request, response) => {
  response.render("sign-in");
});

app.get("/sign-up", (request, response) => {
  response.render("sign-up");
});

app.get("/home", (request, response) => {
  response.render("home");
});

app.get("/three", (request, response) => {
  response.render("three");
});

//ON REQUEST.
//SIGN IN USER.
app.post("/SIGN-IN", (request, response) => {
  let USERNAME = request.headers["username"];
  let PASSWORD = request.headers["password"];
  let SQL =
    "SELECT user_img, username, password FROM users WHERE username = '" +
    USERNAME +
    "'";
  let VALID;
  connection.query(SQL, (error, result) => {
    if (result.length == 0) {
      response.json("404");
    } else {
      VALID = bcrypt.compareSync(PASSWORD, result[0].password);
      if (VALID) {
        const TOKEN = jwt.sign(JSON.stringify(result), "~!@#$%^&*()_+");
        return response.json(TOKEN);
      } else {
        response.json("404");
      }
    }
  });
});

//CHECK IF USER ALREADY EXIST.
app.post("/CHECK-INPUT", (request, response) => {
  let USERNAME = request.headers["username"];
  let SQL = "SELECT username FROM users WHERE username = '" + USERNAME + "'";
  connection.query(SQL, (error, result) => {
    if (result.length > 0) {
      response.sendStatus(200);
    } else {
      response.sendStatus(400);
    }
  });
});

//REGISTER USER.
app.post("/REGISTER-USER", (request, response) => {
  let USERNAME = request.headers["username"];
  let PASSWORD = request.headers["password"];
  bcrypt.hash(PASSWORD, 10, (error, hash) => {
    let SQL =
      "INSERT INTO users (user_img, username, password) VALUES ('0', '" +
      USERNAME +
      "', '" +
      hash +
      "')";
    connection.query(SQL);
  });
});

//REFRESH TOKEN.
app.post("/REFRESH-TOKEN", (request, response) => {
  let USERNAME = request.headers["username"];
  let SQL =
    "SELECT user_img, username FROM users WHERE username = '" + USERNAME + "'";
  connection.query(SQL, (error, result) => {
    const TOKEN = jwt.sign(JSON.stringify(result), "~!@#$%^&*()_+");
    return response.json(TOKEN);
  });
});

//GET USER INFO.
app.get("/GET-USER-INFO", (request, response) => {
  let USERNAME = request.headers["username"];
  let SQL =
    "SELECT user_img, username FROM users WHERE username = '" + USERNAME + "'";
  connection.query(SQL, (error, result) => {
    return response.json(result);
  });
});

//GET FRIEND LISTS.
app.get("/GET-FRIEND-LISTS", (request, response) => {
  let USERNAME = request.headers["username"];
  let SQL =
    "SELECT * FROM friend_lists WHERE user1 = '" +
    USERNAME +
    "' OR user2 = '" +
    USERNAME +
    "'";
  let FRIENDS = [];

  connection.query(SQL, (error, result) => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].user1 == USERNAME) {
        FRIENDS.push(result[i].user2);
      } else {
        FRIENDS.push(result[i].user1);
      }
    }
    return response.json(FRIENDS);
  });
});

//GET FRIEND REQUEST.
app.get("/GET-FRIEND-REQUEST", (request, response) => {
  let USERNAME = request.headers["username"];
  let SQL =
    "SELECT request_by FROM friend_request WHERE request_to = '" +
    USERNAME +
    "'";
  let FRIEND_REQUEST = [];
  connection.query(SQL, (error, result) => {
    for (let i = 0; i < result.length; i++) {
      FRIEND_REQUEST.push(result[i].request_by);
    }
    return response.json(FRIEND_REQUEST);
  });
});

//GET WHO USER SENT REQUEST TO.
app.get("/GET-USER-REQUEST-TO", (request, response) => {
  let USERNAME = request.headers["username"];
  let SQL =
    "SELECT request_to FROM friend_request WHERE request_by = '" +
    USERNAME +
    "'";
  let REQUEST_SENT_TO = [];
  connection.query(SQL, (error, result) => {
    for (let i = 0; i < result.length; i++) {
      REQUEST_SENT_TO.push(result[i].request_to);
    }
    return response.json(REQUEST_SENT_TO);
  });
});

//GET OTHER PEOPLE USER MAY KNOW.
app.get("/GET-OTHER-USER", (request, response) => {
  let SQL = "SELECT user_img, username FROM users";
  connection.query(SQL, (error, result) => {
    return response.json(result);
  });
});

//GET POST FROM OTHER USER.
app.get("/GET-POSTS", (request, response) => {
  let SQL = "SELECT id, user_img, username, content, date_posted FROM posts";
  connection.query(SQL, (error, result) => {
    return response.json(result);
  });
});

//GET BETWEEN USER RELATION UPON VISIT PROFILE.
app.get("/GET-RELATION", (request, response) => {
  let USERNAME = request.headers["username"];
  let PROFILE = request.headers["profile"];
  let COUNT = request.headers["count"];
  if (COUNT == 0) {
    let SQL =
      "SELECT * FROM friend_lists WHERE user1 = '" +
      USERNAME +
      "' AND user2 = '" +
      PROFILE +
      "' OR user1 = '" +
      PROFILE +
      "' AND user2 = '" +
      USERNAME +
      "'";
    connection.query(SQL, (error, result) => {
      if (result.length > 0) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  }
  if (COUNT == 1) {
    let SQL =
      "SELECT * FROM friend_request WHERE request_by = '" +
      USERNAME +
      "' AND request_to = '" +
      PROFILE +
      "'";
    connection.query(SQL, (error, result) => {
      if (result.length > 0) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  }
  if (COUNT == 2) {
    let SQL =
      "SELECT * FROM friend_request WHERE request_by = '" +
      PROFILE +
      "' AND request_to = '" +
      USERNAME +
      "'";
    connection.query(SQL, (error, result) => {
      if (result.length > 0) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  }
});

//GET COMMENT FOR PARTICULAR POST.
app.get("/GET-COMMENTS", (request, response) => {
  let POST_ID = request.headers["postid"];
  let SQL = "SELECT * FROM comments WHERE post_id = '" + POST_ID + "'";
  connection.query(SQL, (error, result) => {
    return response.json(result);
  });
});

//ONCLICK EVENT.
//ACCEPT FRIEND REQUEST.
app.get("/ACCEPT-REQUEST", (request, response) => {
  let REQUEST_BY = request.headers["request-by"];
  let REQUEST_TO = request.headers["request-to"];
  let SQL1 =
    "INSERT INTO friend_lists (user1, user2) VALUES ('" +
    REQUEST_BY +
    "', '" +
    REQUEST_TO +
    "')";
  let SQL2 =
    "DELETE FROM friend_request WHERE request_by = '" +
    REQUEST_BY +
    "' AND request_to = '" +
    REQUEST_TO +
    "'";
  connection.query(SQL1);
  connection.query(SQL2);
});

//DECLINE FRIEND REQUEST.
app.get("/DECLINE-REQUEST", (request, response) => {
  let REQUEST_BY = request.headers["request-by"];
  let REQUEST_TO = request.headers["request-to"];
  let SQL =
    "DELETE FROM friend_request WHERE request_by = '" +
    REQUEST_BY +
    "' AND request_to = '" +
    REQUEST_TO +
    "'";
  connection.query(SQL);
});

//CANCEL FRIEND REQUEST.
app.get("/CANCEL-REQUEST", (request, response) => {
  let REQUEST_BY = request.headers["request-by"];
  let REQUEST_TO = request.headers["request-to"];
  let SQL =
    "DELETE FROM friend_request WHERE request_by = '" +
    REQUEST_BY +
    "' AND request_to = '" +
    REQUEST_TO +
    "'";
  connection.query(SQL);
});

//ADD FRIEND.
app.get("/ADD-FRIEND", (request, response) => {
  let REQUEST_BY = request.headers["request-by"];
  let REQUEST_TO = request.headers["request-to"];
  let SQL =
    "INSERT INTO friend_request (request_by, request_to) VALUES ('" +
    REQUEST_BY +
    "', '" +
    REQUEST_TO +
    "')";
  connection.query(SQL, (error, result) => {
    return response.sendStatus(200);
  });
});

//GO TO PROFILE.
app.get("/user/:username", (request, response) => {
  let USERNAME = request.params.username;
  let SQL =
    "SELECT user_img, username FROM users WHERE username = '" + USERNAME + "'";
  connection.query(SQL, (error, result) => {
    if (result.length == 0) {
      response.render("sign-in");
    } else {
      response.render("profile", {
        user_img: result[0].user_img,
        username: result[0].username,
      });
    }
  });
});

//CREATE POST.
app.get("/CREATE-POST", (request, response) => {
  let USER_IMG = request.headers["imguser"];
  let USERNAME = request.headers["username"];
  let CONTENT = request.headers["content"];
  let DATE_POSTED = request.headers["date_posted"];
  let SQL =
    "INSERT INTO posts (user_img, username, content, date_posted) VALUES ('" +
    USER_IMG +
    "', '" +
    USERNAME +
    "', '" +
    CONTENT +
    "', '" +
    DATE_POSTED +
    "')";
  connection.query(SQL, (error, result) => {
    return response.sendStatus(200);
  });
});

//CHANGE PROFILE PICTURE.
app.get("/CHANGE-PROFILE-PICTURE", (request, response) => {
  let USER_IMG = request.headers["imguser"];
  let USERNAME = request.headers["username"];
  let COUNT = request.headers["count"];
  if (COUNT == 0) {
    let SQL =
      "UPDATE users SET user_img = '" +
      USER_IMG +
      "' WHERE users.username = '" +
      USERNAME +
      "'";
    connection.query(SQL, (error, result) => {
      return response.sendStatus(200);
    });
  }
  if (COUNT == 1) {
    let SQL =
      "UPDATE posts SET user_img = '" +
      USER_IMG +
      "' WHERE username = '" +
      USERNAME +
      "'";
    connection.query(SQL, (error, result) => {
      return response.sendStatus(200);
    });
  }
  if (COUNT == 2) {
    let SQL =
      "UPDATE comments SET user_img = '" +
      USER_IMG +
      "' WHERE username = '" +
      USERNAME +
      "'";
    connection.query(SQL, (error, result) => {
      return response.sendStatus(200);
    });
  }
});

//DELETE POST.
app.get("/DELETE-POST", (request, response) => {
  let POST_ID = request.headers["postid"];
  let SQL = "DELETE FROM posts WHERE id = '" + POST_ID + "'";
  connection.query(SQL, (error, result) => {
    if (result.length > 0) {
      response.sendStatus(200);
    }
  });
});

//UNFRIEND.
app.get("/UNFRIEND", (request, repsonse) => {
  let USERNAME = request.headers["username"];
  let PROFILE = request.headers["profile"];
  let SQL =
    "DELETE FROM friend_lists WHERE user1 = '" +
    USERNAME +
    "' AND user2 = '" +
    PROFILE +
    "' OR user1 = '" +
    PROFILE +
    "' AND user2 = '" +
    USERNAME +
    "'";
  connection.query(SQL);
});

//SENT COMMENT.
app.get("/SENT-COMMENT", (request, response) => {
  let POST_ID = request.headers["postid"];
  let COMMENT = request.headers["comment"];
  let USERNAME = request.headers["username"];
  let USER_IMG = request.headers["userimg"];
  let DATE_COMMENT = request.headers["date_comment"];
  let SQL =
    "INSERT INTO comments (post_id, comment, username, user_img, date_comment) VALUES ('" +
    POST_ID +
    "', '" +
    COMMENT +
    "', '" +
    USERNAME +
    "', '" +
    USER_IMG +
    "', '" +
    DATE_COMMENT +
    "')";
  connection.query(SQL);
});

//DELETE COMMENT.
app.get("/DELETE-COMMENT", (request, response) => {
  let COMMENT_ID = request.headers["commentid"];
  let SQL = "DELETE FROM comments WHERE id = '" + COMMENT_ID + "'";
  connection.query(SQL);
});

//Start Server.
app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080.");
});
