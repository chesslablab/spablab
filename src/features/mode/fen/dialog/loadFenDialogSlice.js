import { createSlice } from '@reduxjs/toolkit';

const loadFenDialogSlice = createSlice({
  name: 'loadFenDialog',
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
} = loadFenDialogSlice.actions;
export default loadFenDialogSlice.reducer;
