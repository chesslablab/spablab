import { createSlice } from '@reduxjs/toolkit';

const searchEcoDialogSlice = createSlice({
  name: 'searchEcoDialog',
  initialState: {
    open: false
  },
  reducers: {
    openSearchEcoDialog(state) {
      state.open = true;
    },
    closeSearchEcoDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openSearchEcoDialog,
  closeSearchEcoDialog
} = searchEcoDialogSlice.actions;
export default searchEcoDialogSlice.reducer;
