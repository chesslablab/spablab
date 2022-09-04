import { createSlice } from '@reduxjs/toolkit';

const queryStatsDialogSlice = createSlice({
  name: 'queryStatsDialog',
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
} = queryStatsDialogSlice.actions;
export default queryStatsDialogSlice.reducer;
