const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection secured !!!");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

const port = 1234;

app.listen(port, () => {
  try {
    console.log("The server is running !!!");
  } catch (error) {
    console.log(error);
  }
});
