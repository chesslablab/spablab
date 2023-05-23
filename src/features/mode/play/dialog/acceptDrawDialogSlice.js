import { createSlice } from '@reduxjs/toolkit';

const acceptDrawDialogSlice = createSlice({
  name: 'acceptDrawDialog',
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
} = acceptDrawDialogSlice.actions;
export default acceptDrawDialogSlice.reducer;
