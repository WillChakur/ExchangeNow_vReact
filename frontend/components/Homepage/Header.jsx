import Login from "./Login";
import Account from "./Account";
import fetchUser from "../../fetchData/fetchUser";
import { useState, useEffect } from "react";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = fetchUser();
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <header>
      <div className="logo">
        <h1>Exchange Rates</h1>
      </div>
      <div className="nav">{isLoggedIn ? <Account /> : <Login />}</div>
    </header>
  );
};

export default Header;
