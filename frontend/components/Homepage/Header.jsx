import Login from "./Login";
import Account from "./Account";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>Exchange Rates</h1>
      </div>
      <div className="nav">
        <Login />
        <Account />
      </div>
    </header>
  );
};

export default Header;
