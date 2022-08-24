import { createSlice } from '@reduxjs/toolkit';

const watchDialogSlice = createSlice({
  name: 'watchDialog',
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
} = watchDialogSlice.actions;
export default watchDialogSlice.reducer;
