import { createSlice } from '@reduxjs/toolkit';

const eventsStatsDialogSlice = createSlice({
  name: 'eventsStatsDialog',
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
} = eventsStatsDialogSlice.actions;
export default eventsStatsDialogSlice.reducer;
