import { createSlice } from '@reduxjs/toolkit';

const watchDialogSlice = createSlice({
  name: 'watchDialog',
  initialState: {
    open: false
  },
  reducers: {
    watchDialogOpen(state) {
      state.open = true;
    },
    watchDialogClose(state) {
      state.open = false;
    }
  }
});

export const { watchDialogOpen, watchDialogClose } = watchDialogSlice.actions;
export default watchDialogSlice.reducer;
