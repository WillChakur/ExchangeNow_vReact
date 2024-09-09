import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountpageCss from "./Accountpage.module.css";
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
    <div className={AccountpageCss.container}>
      <div className={AccountpageCss.accountPage}>
        <div className={AccountpageCss.header}>
          <button className={AccountpageCss.btn} onClick={handleLogout}>
            Logout
          </button>
          <button className={AccountpageCss.btn} onClick={handleBack}>
            Home
          </button>
        </div>

        <div className="accountPage-title">
          <h1>Welcome Back!!👋</h1>
        </div>

        <div className="transactionsButton">
          <button className={AccountpageCss.btn} onClick={getTransactions}>
            Last Transactions
          </button>
        </div>

        <div className="transaction-list">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <ul>
            {transactions &&
              transactions.map((transaction) => (
                <li
                  className={AccountpageCss.listItem}
                  key={transaction.transactionid}
                >
                  {" "}
                  <span className={AccountpageCss.span}>
                    Base: {transaction.base} ➡️ BRL: {transaction.brl} -- USD:{" "}
                    {transaction.usd} -- JPY: {transaction.usd} -- GBP:{" "}
                    {transaction.gbp} -- BTC: {transaction.btc} -- CAD:{" "}
                    {transaction.cad}{" "}
                  </span>{" "}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accountpage;
