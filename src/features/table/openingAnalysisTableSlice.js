import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  open: false
};

const openingAnalysisTableSlice = createSlice({
  name: 'openingAnalysisTable',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true,
      state.rows = action.payload.rows;
    }
  }
});

export const {
  close,
  show
} = openingAnalysisTableSlice.actions;
export default openingAnalysisTableSlice.reducer;
