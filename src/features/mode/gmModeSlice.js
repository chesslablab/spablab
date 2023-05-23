import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.GM,
  variant: variantConst.CLASSICAL,
  gm: {}
};

const gmModeSlice = createSlice({
  name: 'gmMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.gm = action.payload;
    }
  }
});

export const {
  start,
  set
} = gmModeSlice.actions;
export default gmModeSlice.reducer;
