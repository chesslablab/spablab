import { createSlice } from '@reduxjs/toolkit';

const openingSearchMovetextDialogSlice = createSlice({
  name: 'openingSearchMovetextDialog',
  initialState: {
    open: false
  },
  reducers: {
    openingSearchMovetextDialogOpen(state) {
      state.open = true;
    },
    openingSearchMovetextDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  openingSearchMovetextDialogOpen,
  openingSearchMovetextDialogClose
} = openingSearchMovetextDialogSlice.actions;
export default openingSearchMovetextDialogSlice.reducer;
