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

    if (!res.ok) {
      console.log("Error while getting the transactions");
      return;
    }

    const json = await res.json();

    console.log(json);
  } catch (error) {}
};

export default fetchTransactions;
