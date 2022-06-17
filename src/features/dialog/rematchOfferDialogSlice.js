import { createSlice } from '@reduxjs/toolkit';

const rematchOfferDialogSlice = createSlice({
  name: 'rematchOfferDialog',
  initialState: {
    open: false
  },
  reducers: {
    openRematchOfferDialog(state) {
      state.open = true;
    },
    closeRematchOfferDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openRematchOfferDialog,
  closeRematchOfferDialog
} = rematchOfferDialogSlice.actions;
export default rematchOfferDialogSlice.reducer;
