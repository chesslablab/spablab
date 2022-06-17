import { createSlice } from '@reduxjs/toolkit';

const offerRematchDialogSlice = createSlice({
  name: 'offerRematchDialog',
  initialState: {
    open: false
  },
  reducers: {
    openOfferRematchDialog(state) {
      state.open = true;
    },
    closeOfferRematchDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openOfferRematchDialog,
  closeOfferRematchDialog
} = offerRematchDialogSlice.actions;
export default offerRematchDialogSlice.reducer;
