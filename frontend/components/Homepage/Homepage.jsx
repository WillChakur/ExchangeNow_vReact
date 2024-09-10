import ExchangeForm from "./ExchangeForm";
import Header from "./Header";
import HomepageCss from "./Homepage.module.css";
const Homepage = () => {
  return (
    <div className={HomepageCss.container}>
      <div className={HomepageCss.homepage}>
        <Header />
        <ExchangeForm />
      </div>
    </div>
  );
};

export default Homepage;
