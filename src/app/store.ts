import { configureStore } from "@reduxjs/toolkit";

import auth from "../features/auth/authSlice";
import orders from "../features/orders/ordersSlice";
import suppliers from "../features/suppliers/suppliersSlice";
import brands from "../features/brands/brandsSlice";
import shipments from "../features/shipments/shipmentsSlice";
import orderItems from "../features/orderItems/orderItemsSlice";

export const store = configureStore({
  reducer: {
    auth,
    orders,
    suppliers,
    brands,
    shipments,
    orderItems  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;