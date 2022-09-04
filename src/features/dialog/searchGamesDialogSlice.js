import { createSlice } from '@reduxjs/toolkit';

const searchGamesDialogSlice = createSlice({
  name: 'searchGamesDialog',
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
} = searchGamesDialogSlice.actions;
export default searchGamesDialogSlice.reducer;
