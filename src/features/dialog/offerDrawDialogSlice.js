import { createSlice } from '@reduxjs/toolkit';

const offerDrawDialogSlice = createSlice({
  name: 'offerDrawDialog',
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
} = offerDrawDialogSlice.actions;
export default offerDrawDialogSlice.reducer;
