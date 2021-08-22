import React from "react";
import ReactDOM from "react-dom";
import BigNumber from "bignumber.js";
import Providers from "./Providers";
import App from "./App";

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);
