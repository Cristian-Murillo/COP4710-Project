require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 5000;

app.set("port", PORT);

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", require("./routes/users"));

app.use("/api/events", require("./routes/event"));

app.use("/api/comments", require("./routes/comment"));

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
