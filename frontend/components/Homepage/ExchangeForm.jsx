import fetchResult from "../../fetchData/fetchResult";
import Result from "./Result";
import { useState } from "react";
import ExchangeFormCss from "./ExchangeForm.module.css";

const base = ["EUR"];
const target = ["BRL", "USD", "JPY", "EUR", "GBP", "BTC", "CAD"];

const ExchangeForm = () => {
  const [resultData, setResultData] = useState();
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const base = formData.get("base");
    const target = formData.get("target");

    const data = await fetchResult(base, target);

    console.log(data);

    setResultData(data);
    setSelectedBase(base);
    setSelectedTarget(target);
  };

  return (
    <div className={ExchangeFormCss.container}>
      <form className={ExchangeFormCss.form} onSubmit={onSubmit}>
        <label className={ExchangeFormCss.label} htmlFor="base">
          Base currency:
        </label>
        <select className={ExchangeFormCss.select} id="base" name="base">
          <option value="">Select a currency</option>
          {base.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <label className={ExchangeFormCss.label} htmlFor="target">
          Target currency:
        </label>
        <select className={ExchangeFormCss.select} id="target" name="target">
          <option value="">Select a currency</option>
          {target.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <button className={ExchangeFormCss.btn}>Submit</button>
      </form>

      {resultData && (
        <Result base={selectedBase} target={selectedTarget} data={resultData} />
      )}
    </div>
  );
};

export default ExchangeForm;
