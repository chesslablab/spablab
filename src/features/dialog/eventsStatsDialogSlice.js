import { createSlice } from '@reduxjs/toolkit';

const eventsStatsDialogSlice = createSlice({
  name: 'eventsStatsDialog',
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
} = eventsStatsDialogSlice.actions;
export default eventsStatsDialogSlice.reducer;
