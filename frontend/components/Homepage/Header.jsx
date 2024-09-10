import Login from "./Login";
import Account from "./Account";
import fetchUser from "../../fetchData/fetchUser";
import HeaderCss from "./Header.module.css";
import { useState, useEffect } from "react";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = fetchUser();
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <div className={HeaderCss.container}>
      <header className={HeaderCss.header}>
        <div>
          <h1 className={HeaderCss.logo}>ExchangeXpert</h1>
        </div>
        <div className={HeaderCss.nav}>
          {isLoggedIn ? <Account /> : <Login />}
        </div>
      </header>
    </div>
  );
};

export default Header;
