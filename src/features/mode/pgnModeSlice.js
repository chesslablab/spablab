import { createSlice } from '@reduxjs/toolkit';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  fen: '',
  startPos: '',
  dialogs: {
    loadPgn: {
      open: false,
    },
    searchEco: {
      open: false,
    },
    searchGames: {
      open: false,
      autocomplete: {
        events: [],
        players: [],
      },
    },
    searchMovetext: {
      open: false,
    },
    searchName: {
      open: false,
    },
  },
  tables: {
    panel: {
      open: false,
      game: {},
    },
  },
};

const pgnModeSlice = createSlice({
  name: 'pgnMode',
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
    loadPgnDialog(state, action) {
      state.dialogs.loadPgn = action.payload;
    },
    searchEcoDialog(state, action) {
      state.dialogs.searchEco = action.payload;
    },
    searchGamesDialog(state, action) {
      state.dialogs.searchGames = action.payload;
    },
    searchMovetextDialog(state, action) {
      state.dialogs.searchMovetext = action.payload;
    },
    searchNameDialog(state, action) {
      state.dialogs.searchName = action.payload;
    },
    panelTable(state, action) {
      state.tables.panel = action.payload;
    },
    openingTable(state, action) {
      state.tables.opening = action.payload;
    },
  }
});

export const {
  reset,
  set,
  loadPgnDialog,
  searchEcoDialog,
  searchGamesDialog,
  searchMovetextDialog,
  searchNameDialog,
  panelTable,
  openingTable
} = pgnModeSlice.actions;
export default pgnModeSlice.reducer;
