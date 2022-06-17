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
    closePlayGrandmasterDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openPlayGrandmasterDialog,
  closePlayGrandmasterDialog
} = playGmDialogSlice.actions;
export default playGmDialogSlice.reducer;
