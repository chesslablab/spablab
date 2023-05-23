import { createSlice } from '@reduxjs/toolkit';

const acceptTakebackDialogSlice = createSlice({
  name: 'acceptTakebackDialog',
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
} = acceptTakebackDialogSlice.actions;
export default acceptTakebackDialogSlice.reducer;
