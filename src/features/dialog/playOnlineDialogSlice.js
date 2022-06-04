import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const playOnlineDialogSlice = createSlice({
  name: 'playOnlineDialog',
  initialState: initialState,
  reducers: {
    playOnlineDialogOpen(state, action) {
      state.open = true,
      state.rows = action.payload;
    },
    playOnlineDialogClose(state) {
      state = initialState;
    }
  }
});

export const {
  playOnlineDialogClose,
  playOnlineDialogOpen
} = playOnlineDialogSlice.actions;
export default playOnlineDialogSlice.reducer;
