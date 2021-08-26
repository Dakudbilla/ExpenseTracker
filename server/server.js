const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const transactions = require("./routes/transactions.js");
const connectDB = require("./config/db.js");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//use middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5005;
app.get("/", (req, res) => res.send("Welcome To Express Tracker Api"));

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  );
});
