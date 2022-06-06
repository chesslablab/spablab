import { createSlice } from '@reduxjs/toolkit';

const rematchAcceptDialogSlice = createSlice({
  name: 'rematchAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    rematchAcceptDialogOpen(state) {
      state.open = true;
    },
    rematchAcceptDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  rematchAcceptDialogOpen,
  rematchAcceptDialogClose
} = rematchAcceptDialogSlice.actions;
export default rematchAcceptDialogSlice.reducer;
