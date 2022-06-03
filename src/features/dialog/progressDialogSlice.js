import { createSlice } from '@reduxjs/toolkit';

const progressDialogSlice = createSlice({
  name: 'progressDialog',
  initialState: {
    open: false
  },
  reducers: {
    progressDialogOpen(state) {
      state.open = true;
    },
    progressDialogClose(state) {
      state.open = false;
    }
  }
});

export const { progressDialogOpen, progressDialogClose } = progressDialogSlice.actions;
export default progressDialogSlice.reducer;
