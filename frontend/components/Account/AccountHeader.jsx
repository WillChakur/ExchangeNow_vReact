import AccountHeaderCss from "./AccountHeader.module.css";
import { useNavigate } from "react-router-dom";

const AccountHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const res = await fetch(`${apiUrl}/user/logout`, {
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

  return (
    <div className={AccountHeaderCss.container}>
      <div className={AccountHeaderCss.content}>
        <div className={AccountHeaderCss.logo}>
          <h1 className={AccountHeaderCss.title}>ExchangeXpert</h1>
        </div>

        <div className={AccountHeaderCss.buttons}>
          <button className={AccountHeaderCss.btn} onClick={handleBack}>
            Home
          </button>
          <button className={AccountHeaderCss.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
