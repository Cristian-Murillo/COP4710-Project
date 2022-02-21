const express = require("express");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

app.set("port", process.env.PORT || 5000);

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
