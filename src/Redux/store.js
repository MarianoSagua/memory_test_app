import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { memoSlice } from "./slices";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    memo: memoSlice.reducer,
  },
});
