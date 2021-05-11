import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { getDate, getTime } from "../../utils";
import statuses from "../../constants/ajaxStatus";

const initialState = {
  recentTrades: [],
  status: statuses.IDLE,
};

export const fetchLedger = createAsyncThunk(
  "ledger/fetchLedger",
  agent.quotes.ledger
);

export const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLedger.pending, (state) => {
      state.status = statuses.LOADING;
    });
    builder.addCase(fetchLedger.rejected, (state) => {
      state.status = statuses.ERROR;
    });
    builder.addCase(fetchLedger.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.recentTrades = action.payload;
    });
  },
});

// ACTIONS
export const { setStatus } = ledgerSlice.actions;

// SELECTORS
export const selectStatus = (state) => state.ledger.status;
export const selectRecentTrades = (state) =>
  state.ledger.recentTrades.slice(0, 5).map((trade) => ({
    ...trade,
    createdDate: getDate(trade.created),
    createdTime: getTime(trade.created),
  }));

export default ledgerSlice.reducer;
