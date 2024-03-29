const Transaction = require("./../models/Transaction.js");

/**
 * @description GET all transactions
 * @route        GET /api/v1/transactions
 * @access       PUBLIC
 */
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Server Error `,
    });
  }
};

/**
 * @description Add transaction
 * @route        POST /api/v1/transactions
 * @access       PUBLIC
 */
exports.addTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      //Get validation error and put them into an array
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: `Server Error `,
      });
    }
  }
};

/**
 * @description  DELETE a transaction
 * @route        DELETE /api/v1/transactions/:id
 * @access       PUBLIC
 */
exports.deleteTransaction = async (req, res, next) => {
  try {
    //check if transaction exist
    /**
     * Chain of Responsibility Pattern
     * A request to /api/v1/transactions/:id
     * is done by client, the request is passed
     * to the deleteTransaction handler
     *
     *
     */
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "transaction not found",
      });
    }
    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Server Error `,
    });
  }
};
