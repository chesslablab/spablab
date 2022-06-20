import { createSlice } from '@reduxjs/toolkit';

const playGmDialogSlice = createSlice({
  name: 'playGmDialog',
  initialState: {
    open: false
  },
  reducers: {
    openPlayGrandmasterDialog(state) {
      state.open = true;
    },
    closePlayGmDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openPlayGrandmasterDialog,
  closePlayGmDialog
} = playGmDialogSlice.actions;
export default playGmDialogSlice.reducer;
