import { createSlice } from "@reduxjs/toolkit";

const calculateSubTotal = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total = total + Number(item.qty) * Number(item.price);
  });
  return total;
};

const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem(
    "subtotal",
    calculateSubTotal(JSON.parse(localStorage.getItem("cart")))
  );
};

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  subTotal: localStorage.getItem("cart")
    ? calculateSubTotal(JSON.parse(localStorage.getItem("cart")))
    : 0,
  shipping: 0,
  Total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
      state.subTotal = calculateSubTotal(state.cart);
      updateLocalStorage(state.cart);
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      state.subTotal = calculateSubTotal(state.cart);
      updateLocalStorage(state.cart);
    },
    addOneQty: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      existingItem.qty = existingItem.qty + 1;
      state.subTotal = calculateSubTotal(state.cart);
      updateLocalStorage(state.cart);
    },
    SubOneQty: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      existingItem.qty = existingItem.qty - 1;
      state.subTotal = calculateSubTotal(state.cart);
      updateLocalStorage(state.cart);
    },
  },
});

export const { addToCart, deleteFromCart, addOneQty, SubOneQty } =
  cartSlice.actions;

export default cartSlice.reducer;
