import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/shipments.json";

const slice = createSlice({
  name: "shipments",
  initialState: {
    items: data
  },
  reducers: {}
});

export default slice.reducer;
