import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/brands.json";

const slice = createSlice({
  name: "brands",
  initialState: {
    items: data
  },
  reducers: {}
});

export default slice.reducer;
