const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const transactions = require("./routes/transactions.js");

dotenv.config({ path: "./config/config.env" });

const app = express();

//use middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/transactions", transactions);

module.exports = app;
