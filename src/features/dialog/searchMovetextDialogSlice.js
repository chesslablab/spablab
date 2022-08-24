import { createSlice } from '@reduxjs/toolkit';

const searchMovetextDialogSlice = createSlice({
  name: 'searchMovetextDialog',
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
} = searchMovetextDialogSlice.actions;
export default searchMovetextDialogSlice.reducer;
