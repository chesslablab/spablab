import { createSlice } from '@reduxjs/toolkit';

const resignAcceptDialogSlice = createSlice({
  name: 'resignAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    resignAcceptDialogOpen(state) {
      state.open = true;
    },
    resignAcceptDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  resignAcceptDialogOpen,
  resignAcceptDialogClose
} = resignAcceptDialogSlice.actions;
export default resignAcceptDialogSlice.reducer;
