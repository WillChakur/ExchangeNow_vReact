import fetchResult from "../../fetchData/fetchResult";
import Result from "./Result";
import { useState } from "react";
import ExchangeFormCss from "./ExchangeForm.module.css";

const target = ["BRL", "USD", "JPY", "EUR", "GBP", "BTC", "CAD"];

const ExchangeForm = () => {
  const [resultData, setResultData] = useState();
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const base = formData.get("base");
    const userTarget = formData.get("target");

    if (target.includes(userTarget)) {
      const data = await fetchResult(base, target);

      console.log(data);

      setResultData(data);
      setSelectedBase(base);
      setSelectedTarget(userTarget);
      setLoading(false);
    } else {
      alert("Please choose a target");
    }
  };

  return (
    <div className={ExchangeFormCss.container}>
      <div className={ExchangeFormCss.content}>
        <div className={ExchangeFormCss.titleContainer}>
          <h1>Converter</h1>
        </div>
        <form className={ExchangeFormCss.form} onSubmit={onSubmit}>
          <div className={ExchangeFormCss.baseContainer}>
            <div className={ExchangeFormCss.baseValue}>
              <h2>€ 1,000</h2>
            </div>
            <div className={ExchangeFormCss.baseForm}>
              <label className={ExchangeFormCss.label} htmlFor="base">
                <h2>Base</h2>
              </label>
              <select className={ExchangeFormCss.select} id="base" name="base">
                <option key="EUR" value="EUR">
                  EUR
                </option>
              </select>
            </div>
          </div>

          <div className={ExchangeFormCss.sepContainer}>
            <hr className={ExchangeFormCss.sep} />
          </div>

          <div className={ExchangeFormCss.targetContainer}>
            <div className={ExchangeFormCss.targetValue}>
              {loading ? (
                <h2>. . .</h2>
              ) : resultData ? (
                <Result
                  base={selectedBase}
                  target={selectedTarget}
                  data={resultData}
                />
              ) : (
                <h2>. . .</h2>
              )}
            </div>

            <div className={ExchangeFormCss.targetForm}>
              <label className={ExchangeFormCss.label} htmlFor="target">
                <h2>Target</h2>
              </label>
              <select
                className={ExchangeFormCss.select}
                id="target"
                name="target"
              >
                <option value="">Target</option>
                {target.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className={ExchangeFormCss.btn}>
            <span>Get Conversion</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExchangeForm;
