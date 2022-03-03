require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const server = require("http").createServer(app);

const PORT = process.env.PORT || 5000;

db.connect(function (err) {
  if (err) {
    console.log("ERROR CONNECTING: " + err);
    return;
  } else {
    console.log("MySQL Database Connected");
  }
});

app.set("port", PORT);

app.use(cors());
app.use(express.json());

// routes

app.use("/api/users", require("./routes/users"));

server.listen(PORT, () => {
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
