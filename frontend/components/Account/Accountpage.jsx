import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fetchTransactions from "../../fetchData/fetchTransactions";

const Accountpage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Error while trying to logout");
      }

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const getTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchTransactions();

      setTransactions(res);
    } catch (error) {
      setError("Error fetching the transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="accountPage">
      <div className="header">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleBack}>Home</button>
      </div>

      <div className="accountPage-title">
        <h1>Welcome Back!!👋</h1>
      </div>

      <div className="transactionsButton">
        <button onClick={getTransactions}>Last Transactions</button>
      </div>

      <div className="transaction-list">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.transactionid}>Base: {transaction.base}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accountpage;
