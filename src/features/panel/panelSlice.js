import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: {
    back: 0,
  },
  tables: {
    opening: {
      rows: [],
    },
    gameMetadata: {},
  },
  dialogs: {
    heuristics: {
      open: false,
      heuristics: null,
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
    gameMetadataTable(state, action) {
      state.tables.gameMetadata = action.payload;
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
    heuristicsDialog(state, action) {
      state.dialogs.heuristics = action.payload;
    },
  }
});

export const {
  openingTable,
  gameMetadataTable,
  goTo,
  goBack,
  goForward,
  goToEnd,
  heuristicsDialog
} = panelSlice.actions;
export default panelSlice.reducer;
