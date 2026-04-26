import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/orderItems.json";

const slice = createSlice({
  name: "orderItems",
  initialState: {
    items: data
  },
  reducers: {}
});

export default slice.reducer;