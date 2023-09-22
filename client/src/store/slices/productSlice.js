import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("get/products", async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: null,
  products: [],
};

const productSLice = createSlice({
  name: "product",
  initialState,
  reducers: {},
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
      });
  },
});

export default productSLice.reducer;
