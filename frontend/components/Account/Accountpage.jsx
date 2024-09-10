import { useState } from "react";
import AccountpageCss from "./Accountpage.module.css";
import AccountHeader from "./AccountHeader";
import fetchTransactions from "../../fetchData/fetchTransactions";

const Accountpage = () => {
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
      <AccountHeader />

      <div className={AccountpageCss.accountPage}>
        <div className={AccountpageCss.mainTitle}>
          <h1>Welcome to your Profile 👋</h1>
        </div>

        <button className={AccountpageCss.btn} onClick={getTransactions}>
          <span>Last Transactions</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>

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
