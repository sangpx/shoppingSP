import { createSlice } from "@reduxjs/toolkit";

//fetchFromLocalStorage
const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

//storeInLocalStorage
const storeInLocalStorage = (data) => {
  localStorage.setItem("CartShopping", JSON.stringify(data));
};

//initialState
const initialState = {
  data: fetchFromLocalStorage(),
  totalItem: 0,
  totalAmount: 0,
  deliveryChange: 1000,
};

//cartSlice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //addToCart
    addToCart(state, action) {
      const tempItem = state.data.find((item) => item.id === action.payload.id);
      if (tempItem) {
        const tempCart = state.data.map((item) => {
          if (item.id === action.payload.id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalPrice = newQty * item.price;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newTotalPrice,
            };
          } else {
            return item;
          }
        });

        state.data = tempCart;
        storeInLocalStorage(state.data);
      } else {
        state.data.push(action.payload);
        storeInLocalStorage(state.data);
      }
    },

    //removeFromCart
    removeFromCart(state, action) {
      const tempCart = state.data.filter((item) => item.id !== action.payload);
      state.data = tempCart;
      storeInLocalStorage(state.data);
    },

    //clearCart
    clearCart(state, action) {
      state.data = [];
      storeInLocalStorage(state.data);
    },

    //getCartTotals
    getCartTotals(state, action) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItem = state.data.length;
    },

    //toggleCartQty
    toggleCartQty(state, action) {
      const tempCart = state.data.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;
          if (action.payload.type === "INC") {
            tempQty++;
            tempTotalPrice = tempQty * item.price;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.price;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      state.data = tempCart;
      storeInLocalStorage(state.data);
    },
  },
});

//cartReducer
const cartReducer = cartSlice.reducer;

//actions
export const {
  addToCart,
  getCartTotals,
  removeFromCart,
  clearCart,
  toggleCartQty,
} = cartSlice.actions;

export const data = (state) => state.cartReducer.data;

export default cartReducer;
