import { createSlice } from '@reduxjs/toolkit';

const searchGamesDialogSlice = createSlice({
  name: 'searchGamesDialog',
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
} = searchGamesDialogSlice.actions;
export default searchGamesDialogSlice.reducer;
