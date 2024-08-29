import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account");
  };

  return (
    <div className="accountButton">
      <button onClick={handleClick}>Account</button>
    </div>
  );
};

export default Account;
