import { createSlice } from '@reduxjs/toolkit';

const loadPgnDialogSlice = createSlice({
  name: 'loadPgnDialog',
  initialState: {
    open: false
  },
  reducers: {
    loadPgnDialogOpen(state) {
      state.open = true;
    },
    loadPgnDialogClose(state) {
      state.open = false;
    }
  }
});

export const { loadPgnDialogOpen, loadPgnDialogClose } = loadPgnDialogSlice.actions;
export default loadPgnDialogSlice.reducer;
