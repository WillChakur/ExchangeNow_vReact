import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accountpage = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="accountPage">
      <div className="header">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="accountPage-title">
        <h1>Welcome Back!!👋</h1>
      </div>

      <div className="transactionsButton">
        {/* <button onClick={handleClick}>Last Transactions</button> */}
      </div>
    </div>
  );
};

export default Accountpage;
