const fetchUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    const res = await fetch("http://localhost:3000/user/analyzeToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      console.log("Token invalid or expired");
      return false;
    }

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error checking the token", error);
  }

  return false;
};

export default fetchUser;
