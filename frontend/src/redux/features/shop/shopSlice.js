import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  radio: [],
  checked: [],
  products: [],
  categories: [],
  brandCheckBox: [],
  checkedBrands: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload; 
    },
  },
});

export const {
  setCategories,
  setChecked,
  setRadio,
  setProducts,
  setSelectedBrand,
} = shopSlice.actions;

export default shopSlice.reducer;
