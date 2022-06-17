import { createSlice } from '@reduxjs/toolkit';

const playGrandmasterDialogSlice = createSlice({
  name: 'playGrandmasterDialog',
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
} = playGrandmasterDialogSlice.actions;
export default playGrandmasterDialogSlice.reducer;
