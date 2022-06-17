import { createSlice } from '@reduxjs/toolkit';

const rematchAcceptDialogSlice = createSlice({
  name: 'rematchAcceptDialog',
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
} = rematchAcceptDialogSlice.actions;
export default rematchAcceptDialogSlice.reducer;
