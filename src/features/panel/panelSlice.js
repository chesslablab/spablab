import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: {
    back: 0,
  },
  tables: {
    opening: {
      rows: [],
    },
  },
};

const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    openingTable(state, action) {
      state.tables.opening = action.payload;
    },
    goToHistory(state, action) {
      state.history.back = 0 - action.payload.back;
    },
    goBackHistory(state) {
      state.history.back = state.history.back - 1;
    },
    goForwardHistory(state) {
      state.history.back = state.history.back + 1;
    },
    goToEndHistory(state) {
      state.history.back = 0;
    },
  }
});

export const {
  openingTable,
  goToHistory,
  goBackHistory,
  goForwardHistory,
  goToEndHistory
} = panelSlice.actions;
export default panelSlice.reducer;
