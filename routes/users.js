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
    // console.log("MySQL Database Connected");
  });
}

const authenticateJWT = (req, res, next) => {
  const authHeader = "Bearer " + req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Function to end connection to prevent fatal error
// always end connection after creating one
function disconnectDB() {
  db.end(function (err) {
    if (err) throw err;
    // console.log("DISCONNECTED FROM DB");
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

// get current user info
router.get("/:id", authenticateJWT, async (req, res) => {
  connectDB();
  db.query(
    "SELECT * FROM user WHERE user_id=?",
    req.params.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
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
    "SELECT * FROM user WHERE email=?",
    [req.body.email],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        if (result.length === 0) {
          return res.status(422).json({
            error: "User Not Found",
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0].password,
          function (err, response) {
            console.log(response);
            if (response) {
              try {
                const token = require("../createJWT");
                ret = token.createToken(result[0].user_id);
              } catch (e) {
                ret = { error: e.message };
              }
              const user = {
                id: result[0].user_id,
                email: result[0].email,
                isAdmin: result[0].isAdmin,
                isSuperAdmin: result[0].isSuperAdmin,
                accessToken: ret.accessToken,
              };
              res.status(200).json(user);
            } else {
              res.status(412).json({ error: "Incorrect Password" });
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

// create RSO group
router.post("/create/rso", async (req, res) => {
  // check if user is admin
  connectDB();
  db.query(
    "SELECT user_id FROM user WHERE isAdmin=1 AND user_id=?",
    req.body.id,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "Admins only allowed to create RSO" });
        } else {
          connectDB();
          db.query(
            "INSERT INTO rso (rso_name, user_id) VALUES (?, ?)",
            [req.body.rso_name, req.body.id],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json({ msg: "rso created" });
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

// join RSO group
router.post("/join/rso", async (req, res) => {
  connectDB();
  db.query(
    "SELECT rso_name FROM rso WHERE rso_name=?",
    req.body.rso_name,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "rso doesn't exist" });
        } else {
          connectDB();
          db.query(
            "INSERT INTO rso (rso_name, user_id) VALUES (?, ?)",
            [req.body.rso_name, req.body.id],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json({ msg: "You joined rso" });
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

// Leave RSO group
router.delete("/leave/rso", async (req, res) => {
  connectDB();
  db.query(
    "SELECT rso_name FROM rso WHERE rso_name=?",
    req.body.rso_name,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result.length === 0) {
          res.status(200).json({ msg: "rso doesn't exist" });
        } else {
          connectDB();
          db.query(
            "DELETE FROM rso WHERE rso_name=? AND user_id=?",
            [req.body.rso_name, req.body.id],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                if (result.affectedRows === 0) {
                  res.status(200).json({ msg: "you are not in this rso" });
                } else {
                  res.status(200).json({ msg: "You left rso" });
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
