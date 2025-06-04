import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart";

// need explantion
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippinAddress: {}, paymentMethode: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, item);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); //whats ahapening here
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippinAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethode = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItem: (state) => {
      state.cartItems = []; //set to empty
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItem,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
