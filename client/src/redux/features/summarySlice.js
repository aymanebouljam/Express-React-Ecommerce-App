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
  },
});

export const { setSummary } = summarySlice.actions;

export default summarySlice.reducer;
