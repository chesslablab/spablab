import { createSlice } from '@reduxjs/toolkit';

const takebackOfferDialogSlice = createSlice({
  name: 'takebackOfferDialog',
  initialState: {
    open: false
  },
  reducers: {
    takebackOfferDialogOpen(state) {
      state.open = true;
    },
    takebackOfferDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  takebackOfferDialogOpen,
  takebackOfferDialogClose
} = takebackOfferDialogSlice.actions;
export default takebackOfferDialogSlice.reducer;
