import { useNavigate } from "react-router-dom";
import LoginpageCss from "./Loginpage.module.css";
import LoginHeader from "./LoginHeader";
const Loginpage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const values = [...formData.values()];
    const isEmpty = values.includes("");

    if (isEmpty) {
      console.log("Please provide all values");
      return;
    }

    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (res.status === 401) {
        alert(
          "Oops! The username or password you entered is incorrect. Please try again.",
        );
      }

      const result = await res.json();

      if (result.auth) {
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        result.message;
      }
    } catch (error) {
      console.error("Failed on login authentication, ", error);
    }
  };

  return (
    <div className={LoginpageCss.container}>
      <LoginHeader />
      <div className={LoginpageCss.loginPage}>
        <div className={LoginpageCss.titleContainer}>
          <h1 className={LoginpageCss.title}>Login</h1>
        </div>

        <div className={LoginpageCss.loginSection}>
          <form className={LoginpageCss.form} onSubmit={handleForm}>
            <input
              className={LoginpageCss.input}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <input
              className={LoginpageCss.input}
              type="text"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button className={LoginpageCss.btn}>Login</button>
          </form>

          <button
            className={`${LoginpageCss.btn} ${LoginpageCss.btnReg}`}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
