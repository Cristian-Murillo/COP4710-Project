const express = require("express");
const mysql = require("mysql");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
router.post("/signup", async (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      connectDB();
      db.query(
        "INSERT INTO user (email, password, isAdmin, isSuperAdmin ) VALUES (?, ?, ?, ?)",
        [req.body.email, hash, req.body.admin, req.body.superAdmin],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(422).json({ ERR: error });
          } else {
            res.status(200).json({
              text: "Signup Successful ",
            });
          }
        }
      );
      disconnectDB();
    });
  });
});

// login in a user
router.post("/login", async (req, res) => {
  var ret;
  connectDB();

  db.query(
    "SELECT user_id, email, password FROM `user` WHERE `email`=?",
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
        bcrypt.compare(
          req.body.password,
          result[0].password,
          function (err, resp) {
            if (resp) {
              try {
                const token = require("../createJWT");
                ret = token.createToken(result[0].user_id);
              } catch (e) {
                ret = { error: e.message };
              }
              res.status(200).json(ret);
            } else {
              res.status(422).json({ message: "Incorrect Password" });
            }
          }
        );
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
