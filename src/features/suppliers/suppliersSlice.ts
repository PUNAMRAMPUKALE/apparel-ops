import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/suppliers.json";

const slice = createSlice({
  name:"suppliers",
  initialState:{ items:data },
  reducers:{}
});

export default slice.reducer;
