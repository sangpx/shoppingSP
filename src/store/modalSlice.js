import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  data: [],
  isModalVisible: false,
};

//modalSlice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalData(state, action) {
      state.data = action.payload;
    },

    setIsModalVisible(state, action) {
      state.isModalVisible = action.payload;
    },
  },
});

//modalReducer
const modalReducer = modalSlice.reducer;

//actions
export const { setModalData, setIsModalVisible } = modalSlice.actions;

export default modalReducer;
