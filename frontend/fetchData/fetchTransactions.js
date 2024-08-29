import refreshToken from "../fetchData/refreshToken";

const fetchTransactions = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/rates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      token = await refreshToken();

      if (token) {
        res = await fetch("http://localhost:3000/rates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
  } catch (error) {
    console.log("Error while fetching transactions");
  }
};

export default fetchTransactions;
