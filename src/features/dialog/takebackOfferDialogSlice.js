import { createSlice } from '@reduxjs/toolkit';

const takebackOfferDialogSlice = createSlice({
  name: 'takebackOfferDialog',
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
} = takebackOfferDialogSlice.actions;
export default takebackOfferDialogSlice.reducer;
