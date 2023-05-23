import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.PGN,
  variant: variantConst.CLASSICAL
};

const pgnModeSlice = createSlice({
  name: 'pgnMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
    }
  }
});

export const {
  start,
  set
} = pgnModeSlice.actions;
export default pgnModeSlice.reducer;
