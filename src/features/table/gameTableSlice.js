import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  game: {},
  open: false
};

const gameTableSlice = createSlice({
  name: 'gameTable',
  initialState,
  reducers: {
    gameTableClose: () => initialState,
    gameTableDisplay(state, action) {
      state.open = true,
      state.rows = action.payload.game;
    }
  }
});

export const {
  gameTableClose,
  gameTableDisplay
} = gameTableSlice.actions;
export default gameTableSlice.reducer;
