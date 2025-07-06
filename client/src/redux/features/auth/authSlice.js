import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import STATUSLABEL from "../constants/status";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const { IDLE, SUCCEEDED, LOADING, FAILED } = STATUSLABEL;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/users/login`, credentials);

      return res.data;
    } catch (err) {
      const backendError = err.response?.data?.error ?? "Something went wrong";
      return thunkAPI.rejectWithValue(backendError);
    }
  }
);

export const register = createAsyncThunk(
  "auth/regitser",
  async (newUser, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/users`, newUser);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data?.error || "Somethin went wrong";
      return thunkAPI.rejectWithValue(backendError);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: IDLE,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = IDLE;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.status = SUCCEEDED;
      } else {
        state.status = FAILED;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.error = null;

        localStorage.setItem("token", JSON.stringify(action.payload?.token));
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.error = null;

        localStorage.setItem("token", JSON.stringify(action.payload?.token));
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
