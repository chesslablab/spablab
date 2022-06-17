import { createSlice } from '@reduxjs/toolkit';

const drawAcceptDialogSlice = createSlice({
  name: 'drawAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    openDrawAcceptDialog(state) {
      state.open = true;
    },
    closeDrawAcceptDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openDrawAcceptDialog,
  closeDrawAcceptDialog
} = drawAcceptDialogSlice.actions;
export default drawAcceptDialogSlice.reducer;
