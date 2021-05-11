import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { groupInstruments } from "../../utils";
import { fetchBalance } from "../balance/balanceSlice";
import { fetchLedger } from "../ledger/ledgerSlice";
import statuses from "../../constants/ajaxStatus";

const initialState = {
  instruments: [],
  instrument: "BTCUSD.SPOT",
  quote: null,
  trade: null,
  status: statuses.IDLE,
};

export const fetchInstruments = createAsyncThunk(
  "rfq/fetchInstruments",
  agent.quotes.instruments
);

export const postRfq = createAsyncThunk("rfq/postRfq", agent.quotes.rfq);

export const postTrade = createAsyncThunk(
  "rfq/postTrade",
  async (payload, thunkAPI) => {
    const response = await agent.quotes.trade(payload);
    thunkAPI.dispatch(fetchBalance());
    thunkAPI.dispatch(fetchLedger());
    return response;
  }
);

export const rfqSlice = createSlice({
  name: "rfq",
  initialState,
  reducers: {
    setInstrument: (state, action) => {
      state.instrument = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetQuote: (state, action) => {
      state.quote = null;
    },
    resetRFQ: (state, action) => {
      state.quote = null;
      state.trade = null;
      state.instrument = "BTCUSD.SPOT";
    },
  },
  extraReducers: {
    [fetchInstruments.pending]: (state) => {
      state.status = statuses.LOADING;
    },
    [fetchInstruments.rejected]: (state) => {
      state.status = statuses.ERROR;
    },
    [fetchInstruments.fulfilled]: (state, action) => {
      state.status = statuses.IDLE;
      state.instruments = action.payload;
    },

    [postRfq.pending]: (state) => {
      state.status = statuses.LOADING;
    },
    [postRfq.rejected]: (state) => {
      state.status = statuses.ERROR;
    },
    [postRfq.fulfilled]: (state, action) => {
      state.status = statuses.IDLE;
      state.quote = action.payload;
    },

    [postTrade.pending]: (state) => {
      state.status = statuses.LOADING;
    },
    [postTrade.rejected]: (state) => {
      state.status = statuses.ERROR;
    },
    [postTrade.fulfilled]: (state, action) => {
      state.status = statuses.IDLE;
      state.trade = action.payload;
    },
  },
});

// ACTIONS
export const {
  setInstrument,
  setStatus,
  resetQuote,
  resetRFQ,
} = rfqSlice.actions;

// SELECTORS
export const selectInstruments = (state) =>
  state.rfq.instruments
    .filter((inst) => inst.name.split(".")[1] === "SPOT")
    .reduce(groupInstruments, {});
export const selectInstrument = (state) => state.rfq.instrument;
export const selectStatus = (state) => state.rfq.status;
export const selectQuote = (state) => state.rfq.quote;
export const selectTrade = (state) => state.rfq.trade;

export default rfqSlice.reducer;
