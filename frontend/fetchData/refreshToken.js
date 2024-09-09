const refreshToken = async () => {
  try {
    const res = await fetch("http://localhost:3000/user/refresh_token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Refresh token failed");
      alert(
        "Your session has expired. Please log out and log in again to continue.",
      );
      return null;
    } else {
      localStorage.setItem("token", data.token);
      return data.token;
    }
  } catch (error) {
    console.error("Error refreshing token: ", error);
    return null;
  }
};

export default refreshToken;
