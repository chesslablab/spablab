import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.FEN,
  variant: variantConst.CLASSICAL,
  fen: '',
  startPos: '',
  dialogs: {
    loadFen: {
      open: false,
    },
  },
};

const fenModeSlice = createSlice({
  name: 'fenMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.fen =  action.payload.fen;
      state.startPos =  action.payload.startPos;
    },
    loadFenDialog(state, action) {
      state.dialogs.loadFen = action.payload;
    },
  }
});

export const {
  reset,
  set,
  loadFenDialog
} = fenModeSlice.actions;
export default fenModeSlice.reducer;
