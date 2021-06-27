const appReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_TRANSACTION":
      return {
        ...state,
        loading: false,
        transactions: payload,
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, payload],
      };

    case "EDIT_TRANSACTION":
      return {
        ...state,
        editId: payload,
      };

    case "TRANSACTION_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default appReducer;
