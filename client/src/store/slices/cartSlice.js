import { createSlice } from "@reduxjs/toolkit";

const calculateSubTotal = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total = total + Number(item.quantity) * Number(item.price);
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
  shipping: localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : 0,
  Total: localStorage.getItem("Total")
    ? JSON.parse(localStorage.getItem("Total"))
    : 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
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
      existingItem.quantity = existingItem.quantity + 1;
      state.subTotal = calculateSubTotal(state.cart);
      updateLocalStorage(state.cart);
    },
    SubOneQty: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      existingItem.quantity = existingItem.quantity - 1;
      state.subTotal = calculateSubTotal(state.cart);
      updateLocalStorage(state.cart);
    },
    addShippingTotal: (state, action) => {
      const { shipping, total } = action.payload;
      state.shipping = shipping;
      state.Total = total;
      localStorage.setItem("shipping", JSON.stringify(state.shipping));
      localStorage.setItem("Total", JSON.stringify(state.Total));
    },
    addShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  addOneQty,
  SubOneQty,
  addShippingTotal,
  addShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
