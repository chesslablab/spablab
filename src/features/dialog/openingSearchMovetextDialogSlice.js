import { createSlice } from '@reduxjs/toolkit';

const openingSearchMovetextDialogSlice = createSlice({
  name: 'openingSearchMovetextDialog',
  initialState: {
    open: false
  },
  reducers: {
    openOpeningSearchMovetextDialog(state) {
      state.open = true;
    },
    closeOpeningSearchMovetextDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openOpeningSearchMovetextDialog,
  closeOpeningSearchMovetextDialog
} = openingSearchMovetextDialogSlice.actions;
export default openingSearchMovetextDialogSlice.reducer;
