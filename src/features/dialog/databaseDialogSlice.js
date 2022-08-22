import { createSlice } from '@reduxjs/toolkit';

const databaseDialogSlice = createSlice({
  name: 'databaseDialog',
  initialState: {
    open: false
  },
  reducers: {
    openDatabaseDialog(state) {
      state.open = true;
    },
    closeDatabaseDialog(state) {
      state.open = false;
    }
  }
});

export const { openDatabaseDialog, closeDatabaseDialog } = databaseDialogSlice.actions;
export default databaseDialogSlice.reducer;
