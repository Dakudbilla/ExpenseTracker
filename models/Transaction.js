import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Please Add some Text"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a positive or negative number"],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
