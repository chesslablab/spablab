import { createSlice } from '@reduxjs/toolkit';
import * as mainButtonsConst from 'features/mainButtonsConst';

const initialState = {
  name: mainButtonsConst.ANALYSIS,
  dialogs: {
    createInboxCode: {
      open: false,
      inbox: {},
    },
    enterInboxCode: {
      open: false,
      inbox: {},
    },
    eventsStats: {
      open: false,
      autocomplete: {
        events: [],
        players: [],
      },
    },
    heuristics: {
      open: false,
      heuristics: null,
    },
    openingsStats: {
      open: false,
      stats: {
        drawRate: [],
        winRateForWhite: [],
        winRateForBlack: [],
      },
    },
    playersStats: {
      open: false,
      autocomplete: {
        events: [],
        players: [],
      },
    },
    settings: {
      open: false,
      fields: {
        pieceAnimation: 'on',
        heuristics: 'off',
      },
    },
  },
};

const mainButtonsSlice = createSlice({
  name: 'mainButtons',
  initialState,
  reducers: {
    setAnalysis: () => initialState,
    setPlay: (state) => {
      state.name = mainButtonsConst.PLAY;
    },
    setTraining: (state) => {
      state.name = mainButtonsConst.TRAINING;
    },
    setOpeningSearch: (state) => {
      state.name = mainButtonsConst.OPENING_SEARCH;
    },
    setDatabase: (state) => {
      state.name = mainButtonsConst.DATABASE;
    },
    createInboxCodeDialog(state, action) {
      state.dialogs.createInboxCode = action.payload;
    },
    enterInboxCodeDialog(state, action) {
      state.dialogs.enterInboxCode = action.payload;
    },
    eventsStatsDialog(state, action) {
      state.dialogs.eventsStats = action.payload;
    },
    heuristicsDialog(state, action) {
      state.dialogs.heuristics = action.payload;
    },
    openingsStatsDialog(state, action) {
      state.dialogs.openingsStats = action.payload;
    },
    playersStatsDialog(state, action) {
      state.dialogs.playersStats = action.payload;
    },
    settingsDialog(state, action) {
      state.dialogs.settings = action.payload;
    },
  },
});

export const {
  setAnalysis,
  setPlay,
  setTraining,
  setOpeningSearch,
  setDatabase,
  createInboxCodeDialog,
  enterInboxCodeDialog,
  eventsStatsDialog,
  heuristicsDialog,
  openingsStatsDialog,
  playersStatsDialog,
  settingsDialog
} = mainButtonsSlice.actions;
export default mainButtonsSlice.reducer;
