import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchInstruments } from "./features/requestForQuote/rfqSlice";
import { fetchBalance } from "./features/balance/balanceSlice";
import { fetchLedger } from "./features/ledger/ledgerSlice";
import "./normalize.css";
import "./skeleton.css";
import "./index.css";

store.dispatch(fetchInstruments());
store.dispatch(fetchBalance());
store.dispatch(fetchLedger());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
