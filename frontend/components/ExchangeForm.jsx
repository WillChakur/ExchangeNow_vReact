import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const symbols = ["BRL", "USD", "JPY", "EUR", "GBP", "BTC", "CAD"];

const ExchangeForm = () => {
  return (
    <form className="exchange">
      <label htmlFor="base">Base currency:</label>
      <select id="base" name="base">
        <option value="">Select a currency</option>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
      <label htmlFor="target">Target currency:</label>
      <select id="target" name="target">
        <option value="">Select a currency</option>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
      <button>Submit</button>
    </form>
  );
};

export default ExchangeForm;
