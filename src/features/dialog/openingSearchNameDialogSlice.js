import { createSlice } from '@reduxjs/toolkit';

const openingSearchNameDialogSlice = createSlice({
  name: 'openingSearchNameDialog',
  initialState: {
    open: false
  },
  reducers: {
    openingSearchNameDialogOpen(state) {
      state.open = true;
    },
    openingSearchNameDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  openingSearchNameDialogOpen,
  openingSearchNameDialogClose
} = openingSearchNameDialogSlice.actions;
export default openingSearchNameDialogSlice.reducer;
