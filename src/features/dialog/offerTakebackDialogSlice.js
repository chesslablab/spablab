import { createSlice } from '@reduxjs/toolkit';

const offerTakebackDialogSlice = createSlice({
  name: 'offerTakebackDialog',
  initialState: {
    open: false
  },
  reducers: {
    openTakebackOfferDialog(state) {
      state.open = true;
    },
    closeTakebackOfferDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openTakebackOfferDialog,
  closeTakebackOfferDialog
} = offerTakebackDialogSlice.actions;
export default offerTakebackDialogSlice.reducer;
