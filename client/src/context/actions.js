import axios from "axios";

export const deleteTransactionAction = async (id) => {
  try {
    await axios.delete(`/api/v1/transactions/${id}`);
    return {
      type: "DELETE_TRANSACTION",
      payload: id,
    };
  } catch (err) {
    console.log(err);

    return {
      type: "TRANSACTION_ERROR",
      payload: err.res.data.error,
    };
  }
};

export const addTransactionAction = async (transaction) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const { data } = await axios.post(
      "/api/v1/transactions",
      transaction,
      config
    );
    return {
      type: "ADD_TRANSACTION",
      payload: data.data,
    };
  } catch (err) {
    return {
      type: "TRANSACTION_ERROR",
      payload: err.res.data.error,
    };
  }
};

export const editTransactionAction = (id) => ({
  type: "EDIT_TRANSACTION",
  payload: id,
});

export const getTransactionsAction = async () => {
  try {
    const { data } = await axios.get("/api/v1/transactions");
    return {
      type: "GET_TRANSACTION",
      payload: data.data,
    };
  } catch (err) {
    return {
      type: "TRANSACTION_ERROR",
      payload: err.res.data.error,
    };
  }
};
