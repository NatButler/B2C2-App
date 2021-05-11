import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import statuses from "../../constants/ajaxStatus";

const initialState = {
  balance: {},
  fiat: ["USD", "CHF", "GBP", "SGD", "EUR", "JPY", "CAD", "AUD"],
  crypto: ["LTC", "ETH", "UST", "XRP", "BTC", "BCH"],
  status: statuses.IDLE,
};

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  agent.quotes.balance
);

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.pending, (state) => {
      state.status = statuses.LOADING;
    });
    builder.addCase(fetchBalance.rejected, (state) => {
      state.status = statuses.ERROR;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.balance = action.payload;
    });
  },
});

// ACTIONS
export const { setStatus } = balanceSlice.actions;

// SELECTORS
export const selectStatus = (state) => state.balance.status;
export const selectBalance = (state) =>
  Object.keys(state.balance.balance).reduce(
    (acc, key) => {
      if (state.balance.fiat.includes(key)) {
        acc.fiat.push({
          [key]: state.balance.balance[key],
        });
      }

      if (state.balance.crypto.includes(key)) {
        acc.crypto.push({
          [key]: state.balance.balance[key],
        });
      }

      return acc;
    },
    { fiat: [], crypto: [] }
  );

export default balanceSlice.reducer;
