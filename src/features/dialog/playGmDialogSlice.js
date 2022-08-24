import { createSlice } from '@reduxjs/toolkit';

const playGmDialogSlice = createSlice({
  name: 'playGmDialog',
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
} = playGmDialogSlice.actions;
export default playGmDialogSlice.reducer;
