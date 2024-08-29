import { useNavigate } from "react-router-dom";
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

  const handleClick = async () => {
    const transactions = await fetchTransactions();
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
        <button onClick={handleClick}>Last Transactions</button>
      </div>
    </div>
  );
};

export default Accountpage;
