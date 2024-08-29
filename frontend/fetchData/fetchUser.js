const fetchUser = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// const fetchUser = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return false;
//   }

//   try {
//     const res = await fetch("http://localhost:3000/user", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) {
//       console.error("Error trying to check user: ", res.statusText);
//       return false;
//     }

//     const json = await res.json();

//     return json.logged === "true";
//   } catch (error) {
//     console.error("Error checking the login status: ", error);
//     return false;
//   }
// };

export default fetchUser;
