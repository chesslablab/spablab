import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.STOCKFISH,
  variant: variantConst.CLASSICAL,
  fen: '',
  computer: {}
};

const stockfishModeSlice = createSlice({
  name: 'stockfishMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.computer = action.payload;
    }
  }
});

export const {
  start,
  set
} = stockfishModeSlice.actions;
export default stockfishModeSlice.reducer;
