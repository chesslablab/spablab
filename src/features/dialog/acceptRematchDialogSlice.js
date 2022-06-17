import { createSlice } from '@reduxjs/toolkit';

const acceptRematchDialogSlice = createSlice({
  name: 'acceptRematchDialog',
  initialState: {
    open: false
  },
  reducers: {
    openRematchAcceptDialog(state) {
      state.open = true;
    },
    closeRematchAcceptDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openRematchAcceptDialog,
  closeRematchAcceptDialog
} = acceptRematchDialogSlice.actions;
export default acceptRematchDialogSlice.reducer;
