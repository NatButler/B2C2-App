import React from "react";
import RFQ from "./features/requestForQuote/rfq";
import Balance from "./features/balance/balance";
import Ledger from "./features/ledger/ledger";
import "./App.css";

function App() {
  return (
    <div className='container trading-container'>
      <div className='row'>
        <div className='five columns'>
          <RFQ />
        </div>
        <div className='seven columns'>
          <Balance />
        </div>
      </div>
      <div className='row'>
        <div className='twelve columns'>
          <Ledger />
        </div>
      </div>
    </div>
  );
}

export default App;
