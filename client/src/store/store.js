import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
  },
});

export default store;
