import ExchangeForm from "./ExchangeForm";
import Header from "./Header";
const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <div className="homepage-title">
        <h2>Select Your Base Currency and Discover Exchange Rates</h2>
      </div>
      <ExchangeForm />
    </div>
  );
};

export default Homepage;
