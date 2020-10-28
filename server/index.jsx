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

app.get("/api/get", (req, res) => {
  const homeName = req.query.homeName;
  const awayName = req.query.awayName;
  const sqlSelect = "SELECT * FROM Teams WHERE teamName = ? OR teamName = ?";
  db.query(sqlSelect, [homeName, awayName], (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const teamName = req.body.teamName;
  const beenSelected = req.body.beenSelected;

  const sqlUpdate = "UPDATE Teams SET beenSelected = ? WHERE teamName = ?;";
  db.query(sqlUpdate, [beenSelected, teamName], (err, result) => {
    console.log(err);
  });
});

app.post("/api/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const sqlInsert = "INSERT INTO Users (username, password) VALUES (?, ?)";
    db.query(sqlInsert, [username, hash], (err, result) => {
      console.log(err);
    });
  });
});

app.post("/api/login", (req, res) => {
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
          req.session.user = result;
          res.send(result);
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
