import { createSlice } from "@reduxjs/toolkit";

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState: "Project Board",
  reducers: {
    setActiveTab: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
