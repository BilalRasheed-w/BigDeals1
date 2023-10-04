import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const prodUrl = "http://localhost:5000/api/products";
const usersUrl = "http://localhost:5000/api/users";
const ordersUrl = "http://localhost:5000/api/orders";

export const fetchProducts = createAsyncThunk("get/products", async () => {
  try {
    const response = await axios.get(prodUrl, { withCredentials: true });
    return response.data.products;
  } catch (error) {
    throw error;
  }
});
export const fetchUsers = createAsyncThunk("get/users", async () => {
  try {
    const response = await axios.get(usersUrl, { withCredentials: true });
    return response.data.users;
  } catch (error) {
    throw error;
  }
});
export const fetchOrders = createAsyncThunk("get/orders", async () => {
  try {
    const response = await axios.get(ordersUrl, { withCredentials: true });
    return response.data.orders;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: null,
  products: [],
  users: [],
  orders: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id, role } = action.payload;
      const user = state.users.find((data) => data._id === _id);
      if (user) {
        user.role = role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = null;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.orders = null;
        state.error = action.error.message;
      });
  },
});

export const { updateUser } = adminSlice.actions;
export default adminSlice.reducer;
