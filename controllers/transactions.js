import Transaction from "./../models/Transaction.js";

/**
 * @description GET all transactions
 * @route        GET /api/v1/transactions
 * @access       PUBLIC
 */
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
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
export const addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      succes: true,
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
export const deleteTransaction = async (req, res, next) => {
  try {
    //check if transaction exist
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        succes: false,
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
