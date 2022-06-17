import { createSlice } from '@reduxjs/toolkit';

const searchMovetextDialogSlice = createSlice({
  name: 'searchMovetextDialog',
  initialState: {
    open: false
  },
  reducers: {
    openSearchMovetextDialog(state) {
      state.open = true;
    },
    closeSearchMovetextDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openSearchMovetextDialog,
  closeSearchMovetextDialog
} = searchMovetextDialogSlice.actions;
export default searchMovetextDialogSlice.reducer;
