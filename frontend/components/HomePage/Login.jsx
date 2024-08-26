import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="loginButton">
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
