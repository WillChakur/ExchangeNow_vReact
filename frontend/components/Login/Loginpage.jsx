import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import logger from "../../../backend/logger";
>>>>>>> refs/remotes/origin/main

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
    const isEmpty = values.include("");

    if (isEmpty) {
<<<<<<< HEAD
      console.log("Please provide all values");
=======
      logger.info("Please provide all values");
>>>>>>> refs/remotes/origin/main
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
      });

      if (!res.ok) {
<<<<<<< HEAD
        console.error("Failed to log in");
      } else {
        console.log("Login successful");
        handleBack();
      }
    } catch (error) {
      console.error("Login fetch error ", error);
=======
        logger.error("Failed to log in");
      } else {
        logger.info("Login successful");
        handleBack();
      }
    } catch (error) {
      logger.error("Login fetch error ", error);
>>>>>>> refs/remotes/origin/main
    }
  };

  return (
    <div className="loginPage">
      <div className="homeButton">
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="loginSection">
        <div className="loginForm">
          <form onSubmit={handleForm}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button>Submit</button>
          </form>
        </div>

        <div className="registerButton">
<<<<<<< HEAD
          <button onClick={handleRegister}>Register</button>
=======
          <button onClick={handleRegister()}>Register</button>
>>>>>>> refs/remotes/origin/main
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
