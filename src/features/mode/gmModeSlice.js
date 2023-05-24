import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.GM,
  variant: variantConst.CLASSICAL,
  gm: {},
  tables: {
    panel: {
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
    panelTable(state, action) {
      state.tables.panel = action.payload;
    },
  }
});

export const {
  reset,
  set,
  panelTable
} = gmModeSlice.actions;
export default gmModeSlice.reducer;
