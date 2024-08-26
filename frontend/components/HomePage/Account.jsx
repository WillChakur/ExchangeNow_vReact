import { redirect } from "react-router-dom";

const Account = () => {
  return (
    <div className="accountButton">
      <button onClick={() => redirect("/account")}>Account</button>
    </div>
  );
};

export default Account;
