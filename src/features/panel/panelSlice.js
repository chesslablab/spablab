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
    goTo(state, action) {
      state.history.back = 0 - action.payload.back;
    },
    goBack(state) {
      state.history.back = state.history.back - 1;
    },
    goForward(state) {
      state.history.back = state.history.back + 1;
    },
    goToEnd(state) {
      state.history.back = 0;
    },
  }
});

export const {
  openingTable,
  goTo,
  goBack,
  goForward,
  goToEnd
} = panelSlice.actions;
export default panelSlice.reducer;
