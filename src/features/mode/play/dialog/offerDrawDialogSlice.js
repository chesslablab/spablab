import { createSlice } from '@reduxjs/toolkit';

const offerDrawDialogSlice = createSlice({
  name: 'offerDrawDialog',
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
} = offerDrawDialogSlice.actions;
export default offerDrawDialogSlice.reducer;
