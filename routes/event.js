const express = require("express");
const mysql = require("mysql");
const router = express.Router();
require("dotenv").config();

var db;

// Function to start connection to DB before query
function connectDB() {
  db = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    port: process.env.SQLPORT,
    password: process.env.SQLPASSWORD,
    database: process.env.SQLDATABASE,
  });

  db.connect(function (err) {
    if (err) {
      console.log(err);
    }
    console.log("MySQL Database Connected");
  });
}

// Function to end connection to prevent fatal error
// always end connection after creating one
function disconnectDB() {
  db.end(function (err) {
    if (err) throw err;
    console.log("DISCONNECTED FROM DB");
  });
}

// get all public event
router.get("/", async (req, res) => {
  connectDB();
  db.query("SELECT * FROM event", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
  disconnectDB();
});

// create events
// ADD ADDRESS STUFF -----------------------------------------
router.post("/create", async (req, res) => {
  connectDB();
  // check if user is admin or super admin
  db.query(
    "SELECT user_id FROM user WHERE (isAdmin=1 OR isSuperAdmin=1) AND user_id=?",
    req.body.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "Not authorized to create event" });
        } else {
          // authorized to create event
          connectDB();
          db.query(
            "INSERT INTO event (eventName, eventDate, description, contactEmail, isRSO, isPublic, isPrivate) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [
              req.body.eventName,
              req.body.eventDate,
              req.body.description,
              req.body.contactEmail,
              req.body.isRSO,
              req.body.isPublic,
              req.body.isPrivate,
            ],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json({ msg: "Event created" });
              }
            }
          );
          disconnectDB();
        }
      }
    }
  );

  disconnectDB();
});

module.exports = router;
