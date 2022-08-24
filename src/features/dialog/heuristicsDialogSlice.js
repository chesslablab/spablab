import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null,
  open: false
};

const heuristicsDialogSlice = createSlice({
  name: 'heuristicsDialog',
  initialState: initialState,
  reducers: {
    close: () => initialState,
    open(state, action) {
      state.open = true,
      state.heuristics = action.payload;
    }
  }
});

export const {
  close,
  open
} = heuristicsDialogSlice.actions;
export default heuristicsDialogSlice.reducer;
