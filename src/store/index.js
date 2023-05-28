import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    categoryReducer,
    modalReducer,
    cartReducer,
    productReducer,
  },
});

export default store;
