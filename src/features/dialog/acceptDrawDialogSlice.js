import { createSlice } from '@reduxjs/toolkit';

const acceptDrawDialogSlice = createSlice({
  name: 'acceptDrawDialog',
  initialState: {
    open: false
  },
  reducers: {
    openAcceptDrawDialog(state) {
      state.open = true;
    },
    closeAcceptDrawDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openAcceptDrawDialog,
  closeAcceptDrawDialog
} = acceptDrawDialogSlice.actions;
export default acceptDrawDialogSlice.reducer;
