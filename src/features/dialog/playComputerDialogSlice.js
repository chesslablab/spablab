import { createSlice } from '@reduxjs/toolkit';

const playComputerDialogSlice = createSlice({
  name: 'playComputerDialog',
  initialState: {
    open: false
  },
  reducers: {
    openPlayComputerDialog(state) {
      state.open = true;
    },
    closePlayComputerDialog(state) {
      state.open = false;
    }
  }
});

export const { openPlayComputerDialog, closePlayComputerDialog } = playComputerDialogSlice.actions;
export default playComputerDialogSlice.reducer;
