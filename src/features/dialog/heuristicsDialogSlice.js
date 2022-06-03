import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null,
  open: false
};

const heuristicsDialogSlice = createSlice({
  name: 'heuristicsDialog',
  initialState: initialState,
  reducers: {
    heuristicsDialogOpen(state, action) {
      state.open = true,
      state.heuristics = action.payload;
    },
    heuristicsDialogClose(state) {
      state = initialState;
    }
  }
});

export const {
  heuristicsDialogClose,
  heuristicsDialogOpen
} = heuristicsDialogSlice.actions;
export default heuristicsDialogSlice.reducer;
