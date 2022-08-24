import { createSlice } from '@reduxjs/toolkit';

const playComputerDialogSlice = createSlice({
  name: 'playComputerDialog',
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
} = playComputerDialogSlice.actions;
export default playComputerDialogSlice.reducer;
