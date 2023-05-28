import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

//initialState
const initialState = {
  data: [],
  status: STATUS.IDLE,
  catProductAll: [],
  catProductAllStatus: STATUS.IDLE,
  catProductSingle: [],
  catProductSingleStatus: STATUS.IDLE,
};

//categorySlice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategoriesProductAll(state, action) {
      state.catProductAll.push(action.payload);
    },
    setCategoriesStatusAll(state, action) {
      state.catProductAllStatus = action.payload;
    },
    setCategoriesProductSingle(state, action) {
      state.catProductSingle = action.payload;
    },
    setCategoriesSingleStatus(state, action) {
      state.catProductSingleStatus = action.payload;
    },
  },
});

//fetchCategories
export const fetchCategories = () => {
  return async function fetchCategoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch(`${BASE_URL}categories`);
      const data = await res.json();
      dispatch(setCategories(data.slice(0, 5)));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

//fetchProductsByCategory
export const fetchProductsByCategory = (categoryID, dataType) => {
  return async function fetchCategoryProductThunk(dispatch) {
    if (dataType === "all") dispatch(setCategoriesStatusAll(STATUS.LOADING));
    if (dataType === "single")
      dispatch(setCategoriesSingleStatus(STATUS.LOADING));

    try {
      const res = await fetch(`${BASE_URL}categories/${categoryID}/products`);
      const data = await res.json();
      if (dataType === "all") {
        dispatch(setCategoriesProductAll(data.slice(0, 10)));
        dispatch(setCategoriesStatusAll(STATUS.IDLE));
      }
      if (dataType === "single") {
        dispatch(setCategoriesProductSingle(data.slice(0, 20)));
        dispatch(setCategoriesSingleStatus(STATUS.IDLE));
      }
    } catch (error) {
      console.log(error);
      if (dataType === "all") {
        dispatch(setCategoriesStatusAll(STATUS.ERROR));
      }
      if (dataType === "single") {
        dispatch(setCategoriesSingleStatus(STATUS.ERROR));
      }
    }
  };
};

//categoryReducer
const categoryReducer = categorySlice.reducer;

//actions
export const {
  setCategories,
  setStatus,
  setCategoriesProductAll,
  setCategoriesStatusAll,
  setCategoriesProductSingle,
  setCategoriesSingleStatus,
} = categorySlice.actions;

export const dataSelect = (state) => state.categoryReducer.data;
export const dataStatus = (state) => state.categoryReducer.status;
export const catProductAll = (state) => state.categoryReducer.catProductAll;
export const catProductAllStatus = (state) =>
  state.categoryReducer.catProductAllStatus;

export default categoryReducer;
