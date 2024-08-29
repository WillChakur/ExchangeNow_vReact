import { useNavigate } from "react-router-dom";
const Registerpage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

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

    console.log(data);

    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    <div className="registerPage">
      <div className="homeButton">
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="registerSection">
        <div className="registerForm">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              id="password"
            />
            <input type="text" name="email" placeholder="Email" id="email" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
