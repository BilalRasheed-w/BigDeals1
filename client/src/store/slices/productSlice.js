import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "get/products",
  async ({ keyword = "", currentPage = 1 }) => {
    let link = `https://big-deals1.vercel.app/api/products?keyword=${keyword}&page=${currentPage}`;
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  products: [],
  productsCount: null,
  resultsPerPage: null,
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
        const { products, totalProducts, resultsPerPage } = action.payload;
        state.loading = false;
        state.products = products;
        state.productsCount = totalProducts;
        state.resultsPerPage = resultsPerPage;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = null;
        state.productsCount = null;
        state.error = action.error.message;
      });
  },
});

export default productSLice.reducer;
