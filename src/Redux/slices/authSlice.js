import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkingAuth: (state) => {
      state.status = "checking";
    },
    onLogIn: (state, { payload }) => {
      state.status = "auth";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogOut: (state, { payload }) => {
      state.status = "not-auth";
      state.user = {};
      state.errorMessage = payload;
    },
  },
});

export const { checkingAuth, onLogIn, onLogOut } = authSlice.actions;
