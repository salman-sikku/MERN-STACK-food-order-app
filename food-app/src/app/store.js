import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/authSlice.js';
import searchDataSlice from '../feature/searchDataSlice.js';
import cartSlice from '../feature/cartSlice.js';
import likeMealSlice from '../feature/likeMealSlice.js';

export const store = configureStore({
   reducer: {
       auth: authReducer,
       searchData : searchDataSlice,
       cart : cartSlice,
       likemeal : likeMealSlice
   }
});
