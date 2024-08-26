import { useNavigate } from "react-router-dom";

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
      });

      if (!res.ok) {
        console.error("Failed to log in");
      } else {
        console.log("Login successful");
        handleBack();
      }
    } catch (error) {
      console.error("Login fetch error ", error);
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
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
