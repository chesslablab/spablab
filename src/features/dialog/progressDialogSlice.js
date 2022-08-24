import { createSlice } from '@reduxjs/toolkit';

const progressDialogSlice = createSlice({
  name: 'progressDialog',
  initialState: {
    open: false
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    }
  }
});

export const {
  open,
  close
} = progressDialogSlice.actions;
export default progressDialogSlice.reducer;
