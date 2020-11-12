const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "LastManStanding",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "password",
    resave: false,
    saveUninitialized: false,
    cookies: {
      expires: 60 * 60,
    },
  })
);

app.get("/api/getUsers", (req, res) => {
  //QUERY TEAMS DATABASE TO DETERMINE HOW MANY USERS ARE LEFT
  const sqlSelect = "SELECT COUNT (*) FROM Users WHERE stillRemaining = 1";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get", (req, res) => {
  //QUERY TEAMS DATABASE TO DETERMINE IF TEAMS HAVE BEEN SELECTED
  const homeName = req.query.homeName;
  const awayName = req.query.awayName;
  const sqlSelect = "SELECT * FROM Teams WHERE teamName = ? OR teamName = ?";
  db.query(sqlSelect, [homeName, awayName], (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  //ALTER TEAMS & USER DATABASE TO SIGNIFY THAT TEAM HAS BEEN SELECTED
  const username = req.body.username;
  const set = req.body.set;
  const teamName = req.body.teamName;

  const sqlUpdateUsers =
    "UPDATE Users SET currentSelection = ? WHERE Username = ?;";
  db.query(sqlUpdateUsers, [teamName, username], (err, result) => {
    console.log(err);
  });

  const sqlUpdateTeams = `UPDATE Teams SET ${username} = 1 WHERE teamName = ?;`;
  db.query(sqlUpdateTeams, [teamName], (err, result) => {
    console.log(err);
  });
});

app.post("/api/register", (req, res) => {
  //INSERT NEW USER AND PASSWORD INTO USER DATABASE AND USERNAME COLUMN INTO TEAMS DATABASE
  const username = req.body.username;
  const password = req.body.password;

  const sqlAlter = `ALTER TABLE Teams ADD ${username} tinyint NOT NULL DEFAULT (0)`;
  db.query(sqlAlter, (err, result) => {
    console.log(err);
  });

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const sqlInsert = "INSERT INTO Users (username, password) VALUES (?, ?)";
    db.query(sqlInsert, [username, hash], (err, result) => {
      res.send(result);
    });
  });
});

app.post("/api/login", (req, res) => {
  //QUERY USER DATABASE TO SEE IF USERNAME AND PASSWORD PRESENT
  const username = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM Users WHERE username = ?";

  db.query(sqlSelect, [username], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].Password, (error, response) => {
        if (response) {
          if (!result[0].stillRemaining) {
            res.send({ message: "Sorry, you have been eliminated!" });
          } else {
            req.session.user = result;
            res.send(result);
          }
        } else {
          res.send({ message: "Wrong username/password combination" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
