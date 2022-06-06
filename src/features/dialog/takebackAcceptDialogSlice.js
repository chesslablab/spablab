import { createSlice } from '@reduxjs/toolkit';

const takebackAcceptDialogSlice = createSlice({
  name: 'takebackAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    takebackAcceptDialogOpen(state) {
      state.open = true;
    },
    takebackAcceptDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  takebackAcceptDialogOpen,
  takebackAcceptDialogClose
} = takebackAcceptDialogSlice.actions;
export default takebackAcceptDialogSlice.reducer;
