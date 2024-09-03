import { useNavigate } from "react-router-dom";
import LoginCss from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="loginButton">
      <button className={LoginCss.btn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
