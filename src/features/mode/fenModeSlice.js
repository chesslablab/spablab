import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.FEN,
  variant: variantConst.CLASSICAL,
  fen: ''
};

const fenModeSlice = createSlice({
  name: 'fenMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.fen = action.payload.fen;
    }
  }
});

export const {
  start,
  set
} = fenModeSlice.actions;
export default fenModeSlice.reducer;
