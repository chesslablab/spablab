import { createSlice } from '@reduxjs/toolkit';

const databaseDialogSlice = createSlice({
  name: 'databaseDialog',
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

export const { open, close } = databaseDialogSlice.actions;
export default databaseDialogSlice.reducer;
