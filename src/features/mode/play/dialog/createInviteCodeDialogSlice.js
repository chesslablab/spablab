import { createSlice } from '@reduxjs/toolkit';

const createInviteCodeDialogSlice = createSlice({
  name: 'createInviteCodeDialog',
  initialState: {
    open: false
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    }
  }
});

export const {
  open,
  close
} = createInviteCodeDialogSlice.actions;
export default createInviteCodeDialogSlice.reducer;
