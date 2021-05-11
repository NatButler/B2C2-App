import { configureStore } from "@reduxjs/toolkit";
import rfqReducer from "../features/requestForQuote/rfqSlice";
import balanceReducer from "../features/balance/balanceSlice";
import ledgerReducer from "../features/ledger/ledgerSlice";

export const store = configureStore({
  reducer: {
    rfq: rfqReducer,
    balance: balanceReducer,
    ledger: ledgerReducer,
  },
});
