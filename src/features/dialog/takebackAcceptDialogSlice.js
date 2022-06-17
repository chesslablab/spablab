import { createSlice } from '@reduxjs/toolkit';

const takebackAcceptDialogSlice = createSlice({
  name: 'takebackAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    openTakebackAcceptDialog(state) {
      state.open = true;
    },
    closeTakebackAcceptDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openTakebackAcceptDialog,
  closeTakebackAcceptDialog
} = takebackAcceptDialogSlice.actions;
export default takebackAcceptDialogSlice.reducer;
