// 3. src/features/auth/authSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import users from "../../data/users.json";

const saved = localStorage.getItem("user");

const normalize = (v:string)=>
  String(v || "").trim().toLowerCase();

const slice = createSlice({
  name:"auth",
  initialState:{
    user: saved ? JSON.parse(saved) : null
  },
  reducers:{
    login(state,action){
      const email = normalize(action.payload.email);
      const password = String(action.payload.password).trim();

      const found = (users as any[]).find((u:any)=>
        normalize(u.email) === email &&
        String(u.password).trim() === password
      );

      if(found){
        state.user = found;
        localStorage.setItem(
          "user",
          JSON.stringify(found)
        );
      }
    },

    logout(state){
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});

export const { login, logout } = slice.actions;
export default slice.reducer;