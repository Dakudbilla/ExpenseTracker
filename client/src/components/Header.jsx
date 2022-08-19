import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Header = () => {
  const { logoutUser, user } = useContext(GlobalContext);
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

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          marginTop: "10px",
        }}
      >
        <h4>Hello,{user?.name}</h4>
        <div style={{ width: "60%" }}>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
