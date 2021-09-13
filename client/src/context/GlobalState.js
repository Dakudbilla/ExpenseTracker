import { createContext, useReducer } from "react";
import {
  addTransactionAction,
  deleteTransactionAction,
  editTransactionAction,
  getTransactionsAction,
} from "./actions";
import appReducer from "./AppReducer";

//initial state
const initialState = {
  transactions: [],
  editId: 0,
  error: null,
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const deleteTransaction = async (id) => {
    dispatch(await deleteTransactionAction(id));
  };

  const addTransaction = async (transaction) => {
    dispatch(await addTransactionAction(transaction));
  };

  const editTransaction = async (id) => {
    dispatch(await editTransactionAction(id));
  };

  const getTransactions = async () => {
    dispatch(await getTransactionsAction());
  };

  return (
    /**
     * Facade pattern used here
     * with this users of context will
     * only use GlobalContextProvider to have
     * access to various actions and context state
     * with out accessing each function individually
     *
     */
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        editId: state.editId,
        deleteTransaction,
        addTransaction,
        editTransaction,
        loading: state.loading,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
