import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const openingAnalysisTableSlice = createSlice({
  name: 'openingAnalysisTable',
  initialState,
  reducers: {
    openingAnalysisTableClose: () => initialState,
    openingAnalysisTableDisplay(state, action) {
      state.open = true,
      state.rows = action.payload.rows;
    }
  }
});

export const {
  openingAnalysisTableClose,
  openingAnalysisTableDisplay
} = openingAnalysisTableSlice.actions;
export default openingAnalysisTableSlice.reducer;
