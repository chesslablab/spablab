import { createSlice } from '@reduxjs/toolkit';

const loadFenDialogSlice = createSlice({
  name: 'loadFenDialog',
  initialState: {
    open: false
  },
  reducers: {
    openLoadFenDialog(state) {
      state.open = true;
    },
    closeLoadFenDialog(state) {
      state.open = false;
    }
  }
});

export const { openLoadFenDialog, closeLoadFenDialog } = loadFenDialogSlice.actions;
export default loadFenDialogSlice.reducer;
