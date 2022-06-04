import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const openingAnalysisTableSlice = createSlice({
  name: 'openingAnalysisTable',
  initialState: initialState,
  reducers: {
    openingAnalysisTableDisplay(state, action) {
      state.open = true,
      state.rows = action.payload.rows;
    },
    openingAnalysisTableClose(state) {
      state = initialState;
    }
  }
});

export const {
  openingAnalysisTableClose,
  openingAnalysisTableDisplay
} = openingAnalysisTableSlice.actions;
export default openingAnalysisTableSlice.reducer;
