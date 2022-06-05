import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  game: {},
  open: false
};

const gameTableSlice = createSlice({
  name: 'gameTable',
  initialState,
  reducers: {
    gameTableDisplay(state, action) {
      state.open = true,
      state.rows = action.payload.game;
    },
    gameTableClose(state) {
      state = initialState;
    }
  }
});

export const {
  gameTableClose,
  gameTableDisplay
} = gameTableSlice.actions;
export default gameTableSlice.reducer;
