import { createSlice } from '@reduxjs/toolkit';

const acceptResignDialogSlice = createSlice({
  name: 'acceptResignDialog',
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
} = acceptResignDialogSlice.actions;
export default acceptResignDialogSlice.reducer;
