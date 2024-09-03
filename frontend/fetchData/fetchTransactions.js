import refreshToken from "../fetchData/refreshToken";

const fetchTransactions = async () => {
  let token = localStorage.getItem("token");
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
    } else if (!res.ok) {
      console.log("Error on fetch transactions");
    } else {
      const data = await res.json();

      return data.transactions;
    }
  } catch (error) {
    console.log("Error while fetching transactions");
  }
};

export default fetchTransactions;
