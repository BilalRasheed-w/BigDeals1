import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const myOrders = createAsyncThunk("get/myOrders", async (data) => {
  let link = "http://localhost:5000/api/orders/me";
  try {
    const response = await axios.get(link, { withCredentials: true });
    return response.data.orders;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: null,
  orders: localStorage.getItem("myOrders")
    ? JSON.parse(localStorage.getItem("myOrders"))
    : [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      localStorage.setItem("myOrders", JSON.stringify(state.orders));
      state.error = null;
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = null;
      state.error = action.error.message;
      console.log(
        "🚀 ~ file: orderSlice.js:40 ~ builder.addCase ~ action.error.message:",
        action.error.message
      );
    });
  },
});

// export const {} = orderSlice.actions;

export default orderSlice.reducer;
