import { createSlice } from '@reduxjs/toolkit';

const acceptRematchDialogSlice = createSlice({
  name: 'acceptRematchDialog',
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
} = acceptRematchDialogSlice.actions;
export default acceptRematchDialogSlice.reducer;
