import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tables: {
    openingAnalysis: {
      rows: [],
    },
  },
};

const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    openingAnalysisTable(state, action) {
      state.tables.openingAnalysis = action.payload;
    },
  }
});

export const {
  openingAnalysisTable
} = panelSlice.actions;
export default panelSlice.reducer;
