import { createSlice } from "@reduxjs/toolkit";

const searchDataSlice = createSlice({
  name: "searchData",
  initialState: {
    keyword: "",
    results: [],
  },
  reducers: {
    updateKeyword(state, action) {
      state.keyword = action.payload;
    },
    updateResults(state, action) {
      state.results = action.payload;
    },
  },
});

export const { updateKeyword, updateResults } = searchDataSlice.actions;
export default searchDataSlice.reducer;
