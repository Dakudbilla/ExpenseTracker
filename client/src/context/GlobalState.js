import { createContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import {
  addTransactionAction,
  deleteTransactionAction,
  editTransactionAction,
  getTransactionsAction,
  RegisterUser,
  LoginUser,
  LogoutUser,
} from "./actions";
import appReducer from "./AppReducer";

//initial state
const initialState = {
  transactions: [],
  editId: 0,
  error: null,
  loading: true,
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { token: "", name: "" },
  isAuth: false,
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

  const loginUser = async (user) => {
    dispatch(await LoginUser(user));
  };
  const registerUser = async (user) => {
    dispatch(await RegisterUser(user));
  };
  const logoutUser = async () => {
    dispatch(await LogoutUser());
  };

  const clearError = () => {
    dispatch({
      type: "CLEAR_ERROR",
    });
  };

  // useEffect(() => {
  //   Navigate("/");
  //   console.log("I runnnn");
  // }, [state.user.token]);

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
        loginUser,
        logoutUser,
        registerUser,
        user: state.user,
        error: state.error,
        clearError,
        isAuth: Boolean(state.user.token),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
