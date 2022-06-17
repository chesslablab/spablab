import { createSlice } from '@reduxjs/toolkit';

const resignAcceptDialogSlice = createSlice({
  name: 'resignAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    openResignAcceptDialog(state) {
      state.open = true;
    },
    closeResignAcceptDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openResignAcceptDialog,
  closeResignAcceptDialog
} = resignAcceptDialogSlice.actions;
export default resignAcceptDialogSlice.reducer;
