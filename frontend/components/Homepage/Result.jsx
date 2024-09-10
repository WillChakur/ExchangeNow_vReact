import ResultCss from "./Result.module.css";

const Result = ({ target, data }) => {
  return (
    <div className={ResultCss.container}>
      <div className={ResultCss.result}>
        <h1>{data.rates[target]}</h1>
      </div>
    </div>
  );
};

export default Result;
