import { createSlice } from '@reduxjs/toolkit';

const createInviteCodeDialogSlice = createSlice({
  name: 'createInviteCodeDialog',
  initialState: {
    open: false
  },
  reducers: {
    openCreateInviteCodeDialog(state) {
      state.open = true;
    },
    closeCreateInviteCodeDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openCreateInviteCodeDialog,
  closeCreateInviteCodeDialog
} = createInviteCodeDialogSlice.actions;
export default createInviteCodeDialogSlice.reducer;
