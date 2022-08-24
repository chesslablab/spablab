import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  game: {},
  open: false
};

const gameTableSlice = createSlice({
  name: 'gameTable',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true,
      state.game = action.payload.game;
    }
  }
});

export const {
  close,
  show
} = gameTableSlice.actions;
export default gameTableSlice.reducer;
