const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "LastManStanding",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  const sqlInsert = "INSERT INTO Users (username, password) VALUES (?, ?)";
  db.query(sqlInsert, [username, password], (err, result) => {
    console.log(err);
  });
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM Users WHERE username = ? AND password = ?";
  db.query(sqlSelect, [username, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Wrong username/password combination" });
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
