import { createSlice } from '@reduxjs/toolkit';

const enterInviteCodeDialogSlice = createSlice({
  name: 'enterInviteCodeDialog',
  initialState: {
    open: false
  },
  reducers: {
    enterInviteCodeDialogOpen(state) {
      state.open = true;
    },
    enterInviteCodeDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  enterInviteCodeDialogOpen,
  enterInviteCodeDialogClose
} = enterInviteCodeDialogSlice.actions;
export default enterInviteCodeDialogSlice.reducer;
