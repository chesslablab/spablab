import { createSlice } from '@reduxjs/toolkit';

const createInviteCodeDialogSlice = createSlice({
  name: 'createInviteCodeDialog',
  initialState: {
    open: false
  },
  reducers: {
    createInviteCodeDialogOpen(state) {
      state.open = true;
    },
    createInviteCodeDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  createInviteCodeDialogOpen,
  createInviteCodeDialogClose
} = createInviteCodeDialogSlice.actions;
export default createInviteCodeDialogSlice.reducer;
