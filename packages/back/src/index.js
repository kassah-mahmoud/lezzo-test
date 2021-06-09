const express = require("express");
const router = require("./routes");

const { sequelize, Store } = require("./database/models");
// const bodyParser = require("body-parser");

const { port } = require("./config/server");

const app = express();
app.use("/public/images", express.static("public/images"));
app.use(express.json());
app.use(router);

app.listen(port, async (err) => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`Listening on port ${port}`);
    try {
      await sequelize.authenticate();
      console.log("Connected to database");
    } catch (error) {
      console.log("Error connecting to database", error);
    }
  }
});
