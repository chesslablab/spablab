import { createSlice } from '@reduxjs/toolkit';

const playersStatsDialogSlice = createSlice({
  name: 'playersStatsDialog',
  initialState: {
    open: false,
    autocomplete: {
      events: [],
      players: []
    }
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
    setAutocomplete(state, action) {
      state.autocomplete = action.payload;
    }
  }
});

export const {
  open,
  close,
  setAutocomplete
} = playersStatsDialogSlice.actions;
export default playersStatsDialogSlice.reducer;
