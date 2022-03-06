require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const Connection = require("mysql/lib/Connection");

const PORT = process.env.PORT || 5000;

// function to handle disconnection of db server that may have went down or restarted
function handleDisconnect() {
  db.connect(function (err) {
    if (err) {
      console.log("Error when connecting to DB: " + err);
      setTimeout(handleDisconnect(), 2000);
    } else {
      console.log("MySQL Database Connected");
    }
  });

  db.on("error", function (err) {
    console.log("db.error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.set("port", PORT);

app.use(cors());
app.use(express.json());

// routes

app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

// Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    console.log(req.body);
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
