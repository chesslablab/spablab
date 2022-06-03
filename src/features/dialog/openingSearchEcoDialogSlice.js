import { createSlice } from '@reduxjs/toolkit';

const openingSearchEcoDialogSlice = createSlice({
  name: 'openingSearchEcoDialog',
  initialState: {
    open: false
  },
  reducers: {
    openingSearchEcoDialogOpen(state) {
      state.open = true;
    },
    openingSearchEcoDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  openingSearchEcoDialogOpen,
  openingSearchEcoDialogClose
} = openingSearchEcoDialogSlice.actions;
export default openingSearchEcoDialogSlice.reducer;
