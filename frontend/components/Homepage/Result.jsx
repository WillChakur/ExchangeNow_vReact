import ResultCss from "./Result.module.css";

const Result = ({ base, target, data }) => {
  return (
    <div className={ResultCss.container}>
      <div className={ResultCss.result}>
        <div className={ResultCss.icons}>
          <div className="resultItem">
            <h1>{base}</h1>
          </div>
          <div className="arrow">
            <h1>
              <svg
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </h1>
          </div>
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
