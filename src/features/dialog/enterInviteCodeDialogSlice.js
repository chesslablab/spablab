import { createSlice } from '@reduxjs/toolkit';

const enterInviteCodeDialogSlice = createSlice({
  name: 'enterInviteCodeDialog',
  initialState: {
    open: false
  },
  reducers: {
    openEnterInviteCodeDialog(state) {
      state.open = true;
    },
    closeEnterInviteCodeDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openEnterInviteCodeDialog,
  closeEnterInviteCodeDialog
} = enterInviteCodeDialogSlice.actions;
export default enterInviteCodeDialogSlice.reducer;
