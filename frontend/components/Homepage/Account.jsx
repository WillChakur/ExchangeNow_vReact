import { useNavigate } from "react-router-dom";
import AccountCss from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account");
  };

  return (
    <div>
      <button className={AccountCss.btn} onClick={handleClick}>
        Account
      </button>
    </div>
  );
};

export default Account;
