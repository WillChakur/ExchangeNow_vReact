import ExchangeForm from "./ExchangeForm";
import Header from "./Header";
import HomepageCss from "./Homepage.module.css";
const Homepage = () => {
  return (
    <div className={HomepageCss.container}>
      <div className={HomepageCss.homepage}>
        <Header />
        <div>
          <h2 className={HomepageCss.title}>
            Select Your Base Currency and Discover Exchange Rates
          </h2>
        </div>
        <ExchangeForm />
      </div>
    </div>
  );
};

export default Homepage;
