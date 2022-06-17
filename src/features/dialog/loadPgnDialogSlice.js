import { createSlice } from '@reduxjs/toolkit';

const loadPgnDialogSlice = createSlice({
  name: 'loadPgnDialog',
  initialState: {
    open: false
  },
  reducers: {
    openLoadPgnDialog(state) {
      state.open = true;
    },
    closeLoadPgnDialog(state) {
      state.open = false;
    }
  }
});

export const { openLoadPgnDialog, closeLoadPgnDialog } = loadPgnDialogSlice.actions;
export default loadPgnDialogSlice.reducer;
