const express = require("express");
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions.js");
const { protect } = require("../middleware/authMiddleWare.js");

const router = express.Router();

router.route("/").get(protect, getTransactions).post(protect, addTransaction);

router.route("/:id").delete(protect, deleteTransaction);

module.exports = router;
