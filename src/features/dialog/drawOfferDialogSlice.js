import { createSlice } from '@reduxjs/toolkit';

const drawOfferDialogSlice = createSlice({
  name: 'drawOfferDialog',
  initialState: {
    open: false
  },
  reducers: {
    openDrawOfferDialog(state) {
      state.open = true;
    },
    closeDrawOfferDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openDrawOfferDialog,
  closeDrawOfferDialog
} = drawOfferDialogSlice.actions;
export default drawOfferDialogSlice.reducer;
