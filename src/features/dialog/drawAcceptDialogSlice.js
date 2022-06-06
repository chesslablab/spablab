import { createSlice } from '@reduxjs/toolkit';

const drawAcceptDialogSlice = createSlice({
  name: 'drawAcceptDialog',
  initialState: {
    open: false
  },
  reducers: {
    drawAcceptDialogOpen(state) {
      state.open = true;
    },
    drawAcceptDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  drawAcceptDialogOpen,
  drawAcceptDialogClose
} = drawAcceptDialogSlice.actions;
export default drawAcceptDialogSlice.reducer;
