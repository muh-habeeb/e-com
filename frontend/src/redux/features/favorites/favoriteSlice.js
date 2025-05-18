import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      //check the product is already in fav
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      //remove the product with the matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      //set the favorites to local storage
      return action.payload;
    },
  },
});

export const { setFavorites, removeFromFavorites, addToFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
