import { createSlice } from '@reduxjs/toolkit';

const openingsStatsDialogSlice = createSlice({
  name: 'openingsStatsDialog',
  initialState: {
    open: false,
    stats: {
      drawRate: [],
      winRateForWhite: [],
      winRateForBlack: []
    }
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
    setStats(state, action) {
      state.stats = action.payload;
    }
  }
});

export const {
  open,
  close,
  setStats
} = openingsStatsDialogSlice.actions;
export default openingsStatsDialogSlice.reducer;
