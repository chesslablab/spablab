import { createSlice } from '@reduxjs/toolkit';

const openingSearchEcoDialogSlice = createSlice({
  name: 'openingSearchEcoDialog',
  initialState: {
    open: false
  },
  reducers: {
    openOpeningSearchEcoDialog(state) {
      state.open = true;
    },
    closeOpeningSearchEcoDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openOpeningSearchEcoDialog,
  closeOpeningSearchEcoDialog
} = openingSearchEcoDialogSlice.actions;
export default openingSearchEcoDialogSlice.reducer;
