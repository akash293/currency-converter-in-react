import { useState } from "react";
import "./currency.css";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExchange = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await res.json();
      const exchangeRate = data.rates[toCurrency];

      setRate(exchangeRate);
      setResult((amount * exchangeRate).toFixed(3));
    } catch (error) {
      alert("Failed to fetch exchange rate");
    } finally {
      setLoading(false);
    }
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container">
      <h1 className="title">Awesome Currency Converter</h1>

      <div className="field">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="currency-box">
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencyList.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>

        <button className="swap-btn" onClick={swapCurrency}>⇄</button>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencyList.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Exchange Rate</label>
        <input value={rate} readOnly />
      </div>

      <button
        className="exchange-btn"
        onClick={handleExchange}
        disabled={loading}
      >
        {loading ? "Exchanging..." : "Exchange my money now!"}
      </button>

      {result && (
        <p className="result">
          {amount} {fromCurrency} → <span>{result} {toCurrency}</span>
        </p>
      )}
    </div>
  );
}

const currencyList = [
  "USD","INR","EUR","GBP","AUD","CAD","JPY","CNY","SGD","AED","SAR","ZAR","RUB","PKR"
];
