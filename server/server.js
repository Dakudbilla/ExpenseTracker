const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const transactions = require("./routes/transactions.js");
const users = require("./routes/user");
const connectDB = require("./config/db.js");
const folder = path.resolve();
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//Handling Visits to undefined routes
const notFound = (req, res, next) => {
  res.status(404).json({
    error: `Not Found - ${req.originalUrl}`,
  });
};

//use middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/transactions", transactions);
app.use("/api/v1/users", users);
app.use(notFound);

app.get("/", (req, res) => res.send("Welcome To Express Tracker Api"));
const PORT = process.env.PORT || 5005;
if (process.env.NODE_ENV === "production") {
  //use static build of react app
  app.use(express.static(path.join(folder, "./build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(folder, "client", "build", "index.html"));
  });
} else {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
    );
  });
}
