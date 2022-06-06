import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const playOnlineDialogSlice = createSlice({
  name: 'playOnlineDialog',
  initialState: initialState,
  reducers: {
    playOnlineDialogClose: () => initialState,
    playOnlineDialogOpen(state, action) {
      state.open = true,
      state.rows = action.payload;
    }
  }
});

export const {
  playOnlineDialogClose,
  playOnlineDialogOpen
} = playOnlineDialogSlice.actions;
export default playOnlineDialogSlice.reducer;
