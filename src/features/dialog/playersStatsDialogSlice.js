import { createSlice } from '@reduxjs/toolkit';

const playersStatsDialogSlice = createSlice({
  name: 'playersStatsDialog',
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
} = playersStatsDialogSlice.actions;
export default playersStatsDialogSlice.reducer;
