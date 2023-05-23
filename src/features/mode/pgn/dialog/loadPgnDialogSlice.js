import { createSlice } from '@reduxjs/toolkit';

const loadPgnDialogSlice = createSlice({
  name: 'loadPgnDialog',
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
} = loadPgnDialogSlice.actions;
export default loadPgnDialogSlice.reducer;
