const fetchUser = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default fetchUser;
