import { createSlice } from '@reduxjs/toolkit';

const progressDialogSlice = createSlice({
  name: 'progressDialog',
  initialState: {
    open: false
  },
  reducers: {
    openProgressDialog(state) {
      state.open = true;
    },
    closeProgressDialog(state) {
      state.open = false;
    }
  }
});

export const { openProgressDialog, closeProgressDialog } = progressDialogSlice.actions;
export default progressDialogSlice.reducer;
