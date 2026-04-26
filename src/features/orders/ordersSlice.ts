import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/orders.json";

// Bump this string any time the orders.json shape changes.
// Old caches with a different version are ignored and the fresh
// seed file is used instead.
const SCHEMA_VERSION = "v2-2026-04";

const STORAGE_KEY = "orders";
const VERSION_KEY = "orders_schema_version";

const savedVersion = localStorage.getItem(VERSION_KEY);
const savedRaw = localStorage.getItem(STORAGE_KEY);

const initialItems =
  savedRaw && savedVersion === SCHEMA_VERSION
    ? JSON.parse(savedRaw)
    : data;

// Make sure the version marker is written so future reloads stay consistent.
localStorage.setItem(VERSION_KEY, SCHEMA_VERSION);
localStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));

const persist = (items: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const slice = createSlice({
  name: "orders",

  initialState: {
    items: initialItems
  },

  reducers: {
    addOrder(state, action) {
      state.items.unshift({
        id: Date.now(),
        ...action.payload
      });
      persist(state.items);
    },

    deleteOrder(state, action) {
      state.items = state.items.filter(
        (x: any) => x.id !== action.payload
      );
      persist(state.items);
    },

    updateStatus(state, action) {
      const row = state.items.find(
        (x: any) => x.id === action.payload.id
      );

      if (row) {
        row.status = action.payload.status;
        persist(state.items);
      }
    }
  }
});

export const { addOrder, deleteOrder, updateStatus } = slice.actions;

export default slice.reducer;