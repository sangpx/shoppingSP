import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

//initialState
const initialState = {
  data: [],
  status: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const fetchProducts = () => {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch(`${BASE_URL}products`);
      const data = await res.json();
      dispatch(setProducts(data.slice(2, 7)));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

const { setProducts, setStatus } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;
