import { createSlice } from '@reduxjs/toolkit';

const searchNameDialogSlice = createSlice({
  name: 'searchNameDialog',
  initialState: {
    open: false
  },
  reducers: {
    openSearchNameDialog(state) {
      state.open = true;
    },
    closeSearchNameDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openSearchNameDialog,
  closeSearchNameDialog
} = searchNameDialogSlice.actions;
export default searchNameDialogSlice.reducer;
