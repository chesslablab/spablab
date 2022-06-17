import { createSlice } from '@reduxjs/toolkit';

const openingSearchNameDialogSlice = createSlice({
  name: 'openingSearchNameDialog',
  initialState: {
    open: false
  },
  reducers: {
    openOpeningSearchNameDialog(state) {
      state.open = true;
    },
    closeOpeningSearchNameDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openOpeningSearchNameDialog,
  closeOpeningSearchNameDialog
} = openingSearchNameDialogSlice.actions;
export default openingSearchNameDialogSlice.reducer;
