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

router.post("/review", async (req, res) => {
    connectDB();
    db.query("INSERT INTO comments (user_id, event_id, comment, ratings) VALUES (?, ?, ?, ?)",
    [req.body.user_id, req.body.event_id, req.body.comment, req.body.ratings],
    (error, result) => {
        if (error) {
          console.log(error);
          res.status(422).json({ ERR: error });
        } else {
          res.status(200).json({
            text: "review Successful ",
          });
        }
      }
    );
    disconnectDB();
});

module.exports = router;