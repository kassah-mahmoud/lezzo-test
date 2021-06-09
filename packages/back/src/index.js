const express = require("express");
const bodyParser = require("body-parser");

const { port } = require("./config/server");

const app = express();

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`Listening on port ${port}`);
  }
});

app.get("/", (req, res) => {
  res.json("Hello World");
});
