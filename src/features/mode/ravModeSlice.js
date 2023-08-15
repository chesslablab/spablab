import { createSlice } from '@reduxjs/toolkit';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  fen: '',
  startPos: '',
  dialogs: {
    loadRav: {
      open: false,
    },
    annotatedGames: {
      open: false,
    },
  },
  tables: {
    annotatedGames: [],
  },
};

const ravModeSlice = createSlice({
  name: 'ravMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.fen =  action.payload.fen;
      state.startPos =  action.payload.startPos;
      state.breakdown =  action.payload.breakdown;
      state.filtered =  action.payload.filtered;
    },
    loadRavDialog(state, action) {
      state.dialogs.loadRav = action.payload;
    },
    annotatedGamesDialog(state, action) {
      state.dialogs.annotatedGames = action.payload;
    },
    annotatedGamesTable(state, action) {
      state.tables.annotatedGames = action.payload;
    },
  }
});

export const {
  reset,
  set,
  loadRavDialog,
  annotatedGamesDialog,
  annotatedGamesTable
} = ravModeSlice.actions;
export default ravModeSlice.reducer;
