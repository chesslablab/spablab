import { createSlice } from '@reduxjs/toolkit';

const acceptResignDialogSlice = createSlice({
  name: 'acceptResignDialog',
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
} = acceptResignDialogSlice.actions;
export default acceptResignDialogSlice.reducer;
