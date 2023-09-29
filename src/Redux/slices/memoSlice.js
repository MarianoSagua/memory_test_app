import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  user_wins: [],
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    onLoadCards: (state, { payload }) => {
      state.cards = payload;
    },
    onLoadUserWins: (state, { payload }) => {
      state.user_wins = payload;
    },
  },
});

export const { onLoadCards, onLoadUserWins } = memoSlice.actions;
