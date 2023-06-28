import { createSlice } from '@reduxjs/toolkit';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  fen: '',
  startPos: '',
  dialogs: {
    loadRav: {
      open: false,
    },
  },
};

const ravModeSlice = createSlice({
  name: 'ravMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.fen =  action.payload.fen;
      state.startPos =  action.payload.startPos;
      state.breakdown =  action.payload.breakdown;
      state.filtered =  action.payload.filtered;
    },
    loadRavDialog(state, action) {
      state.dialogs.loadRav = action.payload;
    }
  }
});

export const {
  reset,
  set,
  loadRavDialog
} = ravModeSlice.actions;
export default ravModeSlice.reducer;
