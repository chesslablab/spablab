import { createSlice } from '@reduxjs/toolkit';

const offerRematchDialogSlice = createSlice({
  name: 'offerRematchDialog',
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
} = offerRematchDialogSlice.actions;
export default offerRematchDialogSlice.reducer;
