import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const openingAnalysisTableSlice = createSlice({
  name: 'openingAnalysisTable',
  initialState,
  reducers: {
    closeOpeningAnalysisTable: () => initialState,
    showOpeningAnalysisTable(state, action) {
      state.open = true,
      state.rows = action.payload.rows;
    }
  }
});

export const {
  closeOpeningAnalysisTable,
  showOpeningAnalysisTable
} = openingAnalysisTableSlice.actions;
export default openingAnalysisTableSlice.reducer;
