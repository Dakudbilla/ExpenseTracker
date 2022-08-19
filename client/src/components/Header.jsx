import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Header = () => {
  const { logoutUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/");
  };
  return (
    <>
      <h1 data-testid="header" className="header">
        Expense Tracker
      </h1>

      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Header;
