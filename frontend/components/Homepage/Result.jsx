import ResultCss from "./Result.module.css";

const Result = ({ base, target, data }) => {
  return (
    <div className={ResultCss.container}>
      <div className={ResultCss.result}>
        <div className={ResultCss.icons}>
          <div className="resultItem">
            <h1>{base}</h1>
          </div>
          <div className="arrow">➡️</div>
          <div className="resultItem">
            <h1>{target}</h1>
          </div>
        </div>
        <h1>{data.rates[target]}</h1>
      </div>
    </div>
  );
};

export default Result;
