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

// get all users
router.get("/", async (req, res) => {
  connectDB();
  db.query("SELECT * FROM user", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
  disconnectDB();
});

// signup a user
// TODO ---- hash password
router.post("/signup", async (req, res) => {
  connectDB();

  db.query(
    "INSERT INTO user (email, password, isAdmin, isSuperAdmin ) VALUES (?, ?, ?, ?)",
    [req.body.email, req.body.password, req.body.admin, req.body.superAdmin],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(422).json({ ERR: error });
      } else {
        // sending token somewhere here-----------------------TO DO
        res.status(200).json({
          text: "SUCCESS",
          token: "TOKEN HERE!!!",
        });
      }
    }
  );

  disconnectDB();
});

// login in a user
router.post("/login", async (req, res) => {
  connectDB();

  db.query(
    "SELECT email, password FROM `user` WHERE `email`=?",
    [req.body.email],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          return res.status(422).json({
            message: "User Not Found",
          });
        }
        if (result[0].password === req.body.password) {
          res.status(200).json({ message: "SUCCESS" });
        } else {
          res.status(422).json({ message: "Incorrect Password" });
          return;
        }
      }
    }
  );
  disconnectDB();
});

// is Admin

router.get("/admin/:id", async (req, res) => {
  connectDB();
  db.query(
    "SELECT user_id FROM user WHERE isAdmin=1 AND user_id=?",
    req.params.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "NOT ADMIN" });
        } else {
          res.status(200).json({ msg: "IS ADMIN" });
        }
      }
    }
  );
  disconnectDB();
});
// is Super Admin

router.get("/superadmin/:id", async (req, res) => {
  connectDB();
  db.query(
    "SELECT user_id FROM user WHERE isSuperAdmin=1 AND user_id=?",
    req.params.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "NOT SUPERADMIN" });
        } else {
          res.status(200).json({ msg: "IS SUPERADMIN" });
        }
      }
    }
  );
  disconnectDB();
});

module.exports = router;
