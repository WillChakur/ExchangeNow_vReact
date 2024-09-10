import { useNavigate } from "react-router-dom";
import RegisterpageCss from "./Registerpage.module.css";
import LoginHeader from "../Login/LoginHeader";

const Registerpage = () => {
  const navigate = useNavigate();

  const handleRegistered = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
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
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Error registering the new user");
      } else {
        console.log("Successfully registered");
        handleRegistered();
      }
    } catch (error) {
      console.error("Error in register Fetch operation");
    }
  };

  return (
    <div className={RegisterpageCss.container}>
      <LoginHeader />
      <div className={RegisterpageCss.registerPage}>
        <div className={RegisterpageCss.titleContainer}>
          <h1 className={RegisterpageCss.title}>Register</h1>
        </div>

        <div className="registerSection">
          <div className="registerForm">
            <form className={RegisterpageCss.form} onSubmit={handleSubmit}>
              <input
                className={RegisterpageCss.input}
                type="text"
                name="username"
                placeholder="Username"
                id="username"
              />
              <input
                className={RegisterpageCss.input}
                type="text"
                name="password"
                placeholder="Password"
                id="password"
              />
              <input
                className={RegisterpageCss.input}
                type="text"
                name="email"
                placeholder="Email"
                id="email"
              />
              <button className={RegisterpageCss.btn}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
