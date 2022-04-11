const { Splitscreen } = require("@mui/icons-material");
const express = require("express");
const mysql = require("mysql");
const { UCS2_DANISH_CI } = require("mysql/lib/protocol/constants/charsets");
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

// Post a Review
router.post("/review", async (req, res) => {
  connectDB();
  db.query(
    "INSERT INTO comments (user_id, event_id, comment, ratings) VALUES (?, ?, ?, ?)",
    [req.body.user_id, req.body.event_id, req.body.comment, req.body.ratings],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(422).json({ ERR: error });
      } else {
        res.status(200).json({
          text: "Review Posted Successfully",
        });
      }
    }
  );
  disconnectDB();
});

// Update comments/ratings
router.post("/update", async (req, res) => {
  connectDB();
  db.query(
    "UPDATE comments set comment = ?, ratings = ? where user_id = ? and event_id = ?",
    [req.body.comment, req.body.ratings, req.body.user_id, req.body.event_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(422).json({ ERR: error });
      } else {
        if (result.affectedRows === 0) {
          res.status(200).json("You can't edit a review you didnt post");
        } else {
          res.status(200).json({
            text: "Review Updated Successfully ",
          });
        }
      }
    }
  );
  disconnectDB();
});

// Delete comments
router.delete("/delete", async (req, res) => {
  connectDB();
  db.query(
    "DELETE FROM comments where user_id = ? and event_id = ?",
    [req.body.user_id, req.body.event_id],
    (error, result) => {
      if (result.affectedRows === 0) {
        console.log(result.affectedRows);
        res.status(200).json("You didn't post a review for this event");
      } else {
        res.status(200).json({
          text: "Review Deleted Successfully ",
        });
      }
    }
  );
  disconnectDB();
});

// Get All Reviews from An Event
router.get("/reviews/:event_id", async (req, res) => {
  connectDB();
  db.query(
    "SELECT * FROM comments where event_id = ?",
    [req.params.event_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(422).json({ ERR: error });
      } else {
        res.send(result);
      }
    }
  );
  disconnectDB();
});
module.exports = router;
