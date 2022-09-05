import { createSlice } from '@reduxjs/toolkit';

const openingsStatsDialogSlice = createSlice({
  name: 'openingsStatsDialog',
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
} = openingsStatsDialogSlice.actions;
export default openingsStatsDialogSlice.reducer;
