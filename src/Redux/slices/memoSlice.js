import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    onLoadCards: (state, { payload }) => {
      state.cards = payload;
    },
  },
});

export const { onLoadCards } = memoSlice.actions;
