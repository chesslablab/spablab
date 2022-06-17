import { createSlice } from '@reduxjs/toolkit';

const acceptTakebackDialogSlice = createSlice({
  name: 'acceptTakebackDialog',
  initialState: {
    open: false
  },
  reducers: {
    openAcceptTakebackDialog(state) {
      state.open = true;
    },
    closeAcceptTakebackDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openAcceptTakebackDialog,
  closeAcceptTakebackDialog
} = acceptTakebackDialogSlice.actions;
export default acceptTakebackDialogSlice.reducer;
