import { createSlice } from '@reduxjs/toolkit';

const searchNameDialogSlice = createSlice({
  name: 'searchNameDialog',
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
} = searchNameDialogSlice.actions;
export default searchNameDialogSlice.reducer;
