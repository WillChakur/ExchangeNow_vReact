import jwt_decode from "jwt-decode";

const fetchUser = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const { exp } = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid Token: ", error);
    return false;
  }
};

export default fetchUser;
