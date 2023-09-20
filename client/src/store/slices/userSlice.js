import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/user/login";

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data.userData);
      return response.data.userData;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignOut: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    SignedUp: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { SignOut,SignedUp } = userSlice.actions;

export default userSlice.reducer;
