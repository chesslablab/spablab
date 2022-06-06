import { createSlice } from '@reduxjs/toolkit';

const rematchOfferDialogSlice = createSlice({
  name: 'rematchOfferDialog',
  initialState: {
    open: false
  },
  reducers: {
    rematchOfferDialogOpen(state) {
      state.open = true;
    },
    rematchOfferDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  rematchOfferDialogOpen,
  rematchOfferDialogClose
} = rematchOfferDialogSlice.actions;
export default rematchOfferDialogSlice.reducer;
