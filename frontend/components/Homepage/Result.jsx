const Result = ({ base, target, data }) => {
  return (
    <div className="result">
      <div className="icons">
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
  );
};

export default Result;
