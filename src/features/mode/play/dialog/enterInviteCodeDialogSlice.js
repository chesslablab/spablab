import { createSlice } from '@reduxjs/toolkit';

const enterInviteCodeDialogSlice = createSlice({
  name: 'enterInviteCodeDialog',
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
} = enterInviteCodeDialogSlice.actions;
export default enterInviteCodeDialogSlice.reducer;
