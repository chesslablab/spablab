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
    openPlayOnlineDialog(state, action) {
      state.open = true,
      state.rows = action.payload;
    }
  }
});

export const {
  closePlayOnlineDialog,
  openPlayOnlineDialog
} = playOnlineDialogSlice.actions;
export default playOnlineDialogSlice.reducer;
