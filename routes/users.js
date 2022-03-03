const express = require("express");
const router = express.Router();
const db = require("../config/db");

// get all users
router.get("/", async (req, res) => {
  db.query("SELECT * FROM user", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
