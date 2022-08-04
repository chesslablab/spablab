import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const playOnlineDialogSlice = createSlice({
  name: 'playOnlineDialog',
  initialState: initialState,
  reducers: {
    closePlayOnlineDialog: () => initialState,
    openPlayOnlineDialog(state) {
      state.open = true;
    },
    refreshPlayOnlineDialog(state, action) {
      state.rows = action.payload;
    }
  }
});

export const {
  closePlayOnlineDialog,
  openPlayOnlineDialog,
  refreshPlayOnlineDialog
} = playOnlineDialogSlice.actions;
export default playOnlineDialogSlice.reducer;
