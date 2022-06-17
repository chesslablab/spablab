import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null,
  open: false
};

const heuristicsDialogSlice = createSlice({
  name: 'heuristicsDialog',
  initialState: initialState,
  reducers: {
    closeHeuristicsDialog: () => initialState,
    openHeuristicsDialog(state, action) {
      state.open = true,
      state.heuristics = action.payload;
    }
  }
});

export const {
  closeHeuristicsDialog,
  openHeuristicsDialog
} = heuristicsDialogSlice.actions;
export default heuristicsDialogSlice.reducer;
