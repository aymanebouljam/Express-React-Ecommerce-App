import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productId, thunkAPI) => {
    try {
      const res = await axios.get(`${baseURL}/products/${productId}`);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data?.error ?? "Something went wrong";
      return thunkAPI.rejectWithValue(backendError);
    }
  }
);

const initialState = {
  product: {},
  loading: false,
  error: null,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
