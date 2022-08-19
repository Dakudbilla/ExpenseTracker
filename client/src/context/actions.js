import axios from "axios";

export const deleteTransactionAction = async (id) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    "Content-Type": "application/json",
    authorization: `Bearer ${userInfo.token}`,
  };

  try {
    await axios.delete(`/api/v1/transactions/${id}`, { headers: config });
    return {
      type: "DELETE_TRANSACTION",
      payload: id,
    };
  } catch (err) {
    console.log(err);

    return {
      type: "TRANSACTION_ERROR",
      payload: err.response ? err.response.data.error : err.res.data.error,
    };
  }
};

export const addTransactionAction = async (transaction) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    Authorization: `Bearer ${userInfo.token}`,
  };

  try {
    const { data } = await axios.post("/api/v1/transactions", transaction, {
      headers: config,
    });
    return {
      type: "ADD_TRANSACTION",
      payload: data.data,
    };
  } catch (err) {
    return {
      type: "TRANSACTION_ERROR",
      payload: err.response ? err.response.data.error : err.res.data.error,
    };
  }
};

export const editTransactionAction = (id) => ({
  type: "EDIT_TRANSACTION",
  payload: id,
});

export const getTransactionsAction = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
  };

  console.log(config);

  try {
    const { data } = await axios.get("/api/v1/transactions", {
      headers: config,
    });
    return {
      type: "GET_TRANSACTION",
      payload: data.data,
    };
  } catch (err) {
    return {
      type: "TRANSACTION_ERROR",
      payload: err.response ? err.response.data.error : err.res.data.error,
    };
  }
};

export const LoginUser = async (user) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const { data } = await axios.post("/api/v1/users/login", user, {
      headers: config,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return {
      type: "USER_LOGIN",
      payload: data.data,
    };
  } catch (err) {
    return {
      type: "USER_ERROR",
      payload: err.response.data.error,
    };
  }
};
export const RegisterUser = async (user) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const { data } = await axios.post("/api/v1/users", user, {
      headers: config,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

    return {
      type: "REGISTER_USER",
      payload: data,
    };
  } catch (err) {
    return {
      type: "USER_ERROR",
      payload: err.response.data.error,
    };
  }
};

export const LogoutUser = async () => {
  try {
    localStorage.removeItem("userInfo");

    return {
      type: "LOGOUT_USER",
    };
  } catch (err) {
    return {
      type: "USER_ERROR",
      payload: "logout Failed",
    };
  }
};
