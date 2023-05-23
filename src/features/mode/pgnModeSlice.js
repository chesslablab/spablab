import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.PGN,
  variant: variantConst.CLASSICAL,
  fen: '',
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
};

const pgnModeSlice = createSlice({
  name: 'pgnMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
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
  }
});

export const {
  start,
  set,
  loadPgnDialog,
  searchEcoDialog,
  searchGamesDialog,
  searchMovetextDialog,
  searchNameDialog
} = pgnModeSlice.actions;
export default pgnModeSlice.reducer;
