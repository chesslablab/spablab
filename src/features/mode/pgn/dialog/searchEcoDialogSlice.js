import { createSlice } from '@reduxjs/toolkit';

const searchEcoDialogSlice = createSlice({
  name: 'searchEcoDialog',
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
} = searchEcoDialogSlice.actions;
export default searchEcoDialogSlice.reducer;
