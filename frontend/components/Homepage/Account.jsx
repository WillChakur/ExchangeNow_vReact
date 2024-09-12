import { useNavigate } from "react-router-dom";
import AccountCss from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Clicado");
    try {
      const res = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Error while trying to logout");
      }

      localStorage.removeItem("token");
      navigate(0);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleClick = () => {
    navigate("/account");
  };

  return (
    <div className={AccountCss.nav}>
      <button className={AccountCss.btn} onClick={handleLogout}>
        Logout
      </button>
      <button className={AccountCss.btn} onClick={handleClick}>
        Account
      </button>
    </div>
  );
};

export default Account;
