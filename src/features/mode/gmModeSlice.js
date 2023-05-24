import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.GM,
  variant: variantConst.CLASSICAL,
  gm: {},
  tables: {
    game: {
      open: false,
      game: {},
    },
  },
};

const gmModeSlice = createSlice({
  name: 'gmMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.gm = action.payload;
    },
    gameTable(state, action) {
      state.tables.game = action.payload;
    },
  }
});

export const {
  reset,
  set,
  gameTable
} = gmModeSlice.actions;
export default gmModeSlice.reducer;
