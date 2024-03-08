import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: ''
  },
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      // Axios headers ko set karein
      axios.defaults.headers.common["Authorization"] = token;
    }
  }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
