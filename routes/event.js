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
    // console.log("MySQL Database Connected");
  });
}

// Function to end connection to prevent fatal error
// always end connection after creating one
function disconnectDB() {
  db.end(function (err) {
    if (err) throw err;
    // console.log("DISCONNECTED FROM DB");
  });
}

// get all public events
router.get("/public", async (req, res) => {
  connectDB();
  db.query("SELECT * FROM event WHERE isPublic=1", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
    }
  });
  disconnectDB();
});

// get all RSO events
router.get("/rso", async (req, res) => {
  connectDB();
  db.query("SELECT * FROM event WHERE isRSO=1", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
  disconnectDB();
});

// get all Private events
router.get("/private/:id", async (req, res) => {
  connectDB();
  db.query(
    "SELECT email FROM user WHERE user_id = ?",
    req.params.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let email = result[0].email;
        let domain = email.substring(email.lastIndexOf("@") + 1);
        domain = "%" + domain + "%";
        connectDB();
        db.query(
          "SELECT * FROM event WHERE isPrivate=1 AND contactEmail LIKE ?",
          domain,
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.send(results);
            }
          }
        );
        disconnectDB();
      }
    }
  );
  disconnectDB();
});

// create events

// creating public/ private event
router.post("/create/", async (req, res) => {
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
            "INSERT INTO event (eventName, eventDate, description, contactEmail, isRSO, isPublic, isPrivate, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            [
              req.body.eventName,
              req.body.eventDate,
              req.body.description,
              req.body.contactEmail,
              req.body.isRSO,
              req.body.isPublic,
              req.body.isPrivate,
              req.body.address,
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

// create rso event
router.post("/create/rso", async (req, res) => {
  // check if admin
  connectDB();
  db.query(
    "SELECT user_id FROM user WHERE isAdmin=1 AND user_id=?",
    req.body.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "Admins can only create rso events" });
        } else {
          // check count of rso >=5
          connectDB();
          db.query(
            "SELECT rso_name FROM rso WHERE rso_name=?",
            req.body.rso_name,
            (err, resp) => {
              if (err) {
                console.log(err);
              } else {
                if (resp.length >= 5) {
                  connectDB();
                  db.query(
                    "INSERT INTO event (eventName, eventDate, description, contactEmail, isRSO, isPublic, isPrivate, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                      req.body.eventName,
                      req.body.eventDate,
                      req.body.description,
                      req.body.contactEmail,
                      1,
                      0,
                      0,
                      req.body.address,
                    ],
                    (er, response) => {
                      if (er) {
                        console.log(er);
                      } else {
                        res.status(200).json({ msg: "RSO event created" });
                      }
                    }
                  );
                  disconnectDB();
                } else {
                  res.status(200).json({
                    msg: "Not enough members in rso group to create event",
                  });
                }
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
