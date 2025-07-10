import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchTaxes = createAsyncThunk(
  "tax/fetchTaxes",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseURL}/taxes`);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data?.error ?? "Something went wrong";
      thunkAPI.rejectWithValue(backendError);
    }
  }
);

export const fetchShippingPrices = createAsyncThunk(
  "tax/fetchShippingPrices",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseURL}/shipping`);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data?.error ?? "Something went wrong";
      thunkAPI.rejectWithValue(backendError);
    }
  }
);

const taxSlice = createSlice({
  name: "tax",
  initialState: {
    taxes: JSON.parse(localStorage.getItem("taxes")) || [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaxes.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = action.payload;
        localStorage.setItem("taxes", JSON.stringify(state.taxes));
      })
      .addCase(fetchTaxes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    prices: JSON.parse(localStorage.getItem("shipping")) || [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
        localStorage.setItem("shipping", JSON.stringify(state.prices));
      })
      .addCase(fetchShippingPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectTax = (state) => state.tax.taxes;
export const selectShippingPrice = (state) => state.shipping.prices;

export const taxReducer = taxSlice.reducer;
export const shippingReducer = shippingSlice.reducer;
