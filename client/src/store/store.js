import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import adminSlice from "./slices/adminSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    admin: adminSlice,
  },
});

export default store;
