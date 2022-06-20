import { createSlice } from '@reduxjs/toolkit';

const playGmDialogSlice = createSlice({
  name: 'playGmDialog',
  initialState: {
    open: false
  },
  reducers: {
    openPlayGmDialog(state) {
      state.open = true;
    },
    closePlayGmDialog(state) {
      state.open = false;
    }
  }
});

export const { openPlayGmDialog, closePlayGmDialog } = playGmDialogSlice.actions;
export default playGmDialogSlice.reducer;
