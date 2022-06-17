import { createSlice } from '@reduxjs/toolkit';

const watchDialogSlice = createSlice({
  name: 'watchDialog',
  initialState: {
    open: false
  },
  reducers: {
    openWatchDialog(state) {
      state.open = true;
    },
    closeWatchDialog(state) {
      state.open = false;
    }
  }
});

export const { openWatchDialog, closeWatchDialog } = watchDialogSlice.actions;
export default watchDialogSlice.reducer;
