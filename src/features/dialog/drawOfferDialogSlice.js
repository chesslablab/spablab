import { createSlice } from '@reduxjs/toolkit';

const drawOfferDialogSlice = createSlice({
  name: 'drawOfferDialog',
  initialState: {
    open: false
  },
  reducers: {
    drawOfferDialogOpen(state) {
      state.open = true;
    },
    drawOfferDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  drawOfferDialogOpen,
  drawOfferDialogClose
} = drawOfferDialogSlice.actions;
export default drawOfferDialogSlice.reducer;
