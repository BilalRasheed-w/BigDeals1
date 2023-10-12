import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const prodUrl = "http://localhost:5000/api/admin/products";
const usersUrl = "http://localhost:5000/api/users";
const ordersUrl = "http://localhost:5000/api/orders";

export const fetchAllProducts = createAsyncThunk("get/products", async () => {
  try {
    const response = await axios.get(prodUrl, { withCredentials: true });
    return response.data.allProducts;
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

const calculateTotalOrders = (orders) => {
  let total = 0;
  orders.forEach((item) => {
    total = total + item.orderItems.length;
  });
  return total;
};

const calculateTotalOrdersPrice = (orders) => {
  let total = 0;
  orders.forEach((item) => {
    total = total + item.total;
  });
  return total;
};

const initialState = {
  loading: false,
  error: null,
  products: [],
  totalProducts: "",
  users: [],
  totalUsers: "",
  orders: [],
  totalOrders: "",
  totalOrdersPrice: "",
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
    updateOrder: (state, action) => {
      const { _id, status } = action.payload;
      const order = state.orders.find((item) => item._id === _id);
      if (order) {
        order.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalProducts = state.products.length;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
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
        state.totalUsers = state.users.length;
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
        state.totalOrders = calculateTotalOrders(state.orders);
        state.totalOrdersPrice = calculateTotalOrdersPrice(state.orders);
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.orders = null;
        state.error = action.error.message;
      });
  },
});

export const { updateUser, updateOrder } = adminSlice.actions;
export default adminSlice.reducer;
