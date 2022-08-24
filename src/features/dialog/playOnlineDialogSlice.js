import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const playOnlineDialogSlice = createSlice({
  name: 'playOnlineDialog',
  initialState: initialState,
  reducers: {
    close: () => initialState,
    open(state) {
      state.open = true;
    },
    refresh(state, action) {
      state.rows = action.payload;
    }
  }
});

export const {
  close,
  open,
  refresh
} = playOnlineDialogSlice.actions;
export default playOnlineDialogSlice.reducer;
