import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  game: {},
  open: false
};

const gameTableSlice = createSlice({
  name: 'gameTable',
  initialState,
  reducers: {
    closeGameTable: () => initialState,
    showGameTable(state, action) {
      state.open = true,
      state.game = action.payload.game;
    }
  }
});

export const {
  closeGameTable,
  showGameTable
} = gameTableSlice.actions;
export default gameTableSlice.reducer;
