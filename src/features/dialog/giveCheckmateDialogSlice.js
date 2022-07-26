import { createSlice } from '@reduxjs/toolkit';

const giveCheckmateDialogSlice = createSlice({
  name: 'giveCheckmateDialog',
  initialState: {
    open: false
  },
  reducers: {
    openGiveCheckmateDialog(state) {
      state.open = true;
    },
    closeGiveCheckmateDialog(state) {
      state.open = false;
    }
  }
});

export const { openGiveCheckmateDialog, closeGiveCheckmateDialog } = giveCheckmateDialogSlice.actions;
export default giveCheckmateDialogSlice.reducer;
