import { createSlice } from '@reduxjs/toolkit';

const loadFenDialogSlice = createSlice({
  name: 'loadFenDialog',
  initialState: {
    open: false
  },
  reducers: {
    loadFenDialogOpen(state) {
      state.open = true;
    },
    loadFenDialogClose(state) {
      state.open = false;
    }
  }
});

export const { loadFenDialogOpen, loadFenDialogClose } = loadFenDialogSlice.actions;
export default loadFenDialogSlice.reducer;
