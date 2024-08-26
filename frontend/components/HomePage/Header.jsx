import Login from "./Login";
import Account from "./Account";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Exchange Rates</h1>
      </div>
      <div className="nav">
        <Login />
        <Account />
      </div>
    </div>
  );
};

export default Header;
