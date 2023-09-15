import { createSlice } from '@reduxjs/toolkit';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  fen: '',
  startPos: '',
  dialogs: {
    loadFen: {
      open: false,
    },
    loadImage: {
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
    loadImageDialog(state, action) {
      state.dialogs.loadImage = action.payload;
    },
  }
});

export const {
  reset,
  set,
  loadFenDialog,
  loadImageDialog
} = fenModeSlice.actions;
export default fenModeSlice.reducer;
