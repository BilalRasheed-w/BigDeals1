import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import adminSlice from "./slices/adminSlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    admin: adminSlice,
    order:orderSlice
  },
});

export default store;
