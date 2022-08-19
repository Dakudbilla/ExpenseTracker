import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const [showError, setShowError] = useState(false);
  const { error, clearError } = useContext(GlobalContext);

  useEffect(() => {
    error && setShowError(true);
    setTimeout(() => {
      setShowError(false);
      clearError();
    }, 5000);

    return () => clearTimeout();
  }, [error, clearError]);
  return (
    <>
      {showError ? (
        <div className="error" style={{ textAlign: "center" }}>
          {error}
        </div>
      ) : null}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
