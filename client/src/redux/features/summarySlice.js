import { createSlice } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    shippingAddress: {},
  },
  reducers: {
    setSummary: (state, action) => {
      state.shippingAddress = action.payload;
    },

    clearSummary: (state) => {
      state.shippingAddress = {};
    },
  },
});

export const { setSummary, clearSummary } = summarySlice.actions;

export default summarySlice.reducer;
