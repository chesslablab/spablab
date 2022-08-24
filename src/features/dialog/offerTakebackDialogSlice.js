import { createSlice } from '@reduxjs/toolkit';

const offerTakebackDialogSlice = createSlice({
  name: 'offerTakebackDialog',
  initialState: {
    open: false
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    }
  }
});

export const {
  open,
  close
} = offerTakebackDialogSlice.actions;
export default offerTakebackDialogSlice.reducer;
