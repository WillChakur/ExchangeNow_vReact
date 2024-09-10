import LoginHeaderCss from "./LoginHeader.module.css";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={LoginHeaderCss.container}>
      <div className={LoginHeaderCss.content}>
        <div className={LoginHeaderCss.logo}>
          <h1 className={LoginHeaderCss.title}>ExchangeXpert</h1>
        </div>

        <button className={LoginHeaderCss.btn} onClick={handleBack}>
          Home
        </button>
      </div>
    </div>
  );
};

export default LoginHeader;
