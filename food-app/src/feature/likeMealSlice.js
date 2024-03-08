import { createSlice } from "@reduxjs/toolkit";

const likeMeal = createSlice({
  name: "likemeal",
  initialState: {
    likeItems: JSON.parse(localStorage.getItem("likeMeal")) || [],
  },
  reducers: {
    addLikeMeal: (state, action) => {
      const existingItemIndex = state.likeItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        state.likeItems[existingItemIndex].quantity += 1;
      } else {
        state.likeItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("likeMeal", JSON.stringify(state.likeItems));
    },
    removeMeal: (state, action) => {
      state.likeItems = state.likeItems.filter((item) => item._id !== action.payload);
      localStorage.setItem("likeMeal", JSON.stringify(state.likeItems));
    },
  },
});

export const { addLikeMeal, removeMeal } = likeMeal.actions;

export default likeMeal.reducer;
