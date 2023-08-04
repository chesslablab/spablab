import { createSlice } from '@reduxjs/toolkit';
import * as navConst from 'features/nav/navConst';

const initialState = {
  name: navConst.ANALYSIS,
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

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setAnalysis: () => initialState,
    setPlay: (state) => {
      state.name = navConst.PLAY;
    },
    setTraining: (state) => {
      state.name = navConst.TRAINING;
    },
    setOpeningSearch: (state) => {
      state.name = navConst.OPENING_SEARCH;
    },
    setDatabase: (state) => {
      state.name = navConst.DATABASE;
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
      state.dialogs.settings.open = action.payload.open;
    },
    settingsDialogSet(state, action) {
      state.dialogs.settings.fields = {
        ...state.dialogs.settings.fields,
        ...action.payload
      };
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
  settingsDialog,
  settingsDialogSet
} = navSlice.actions;
export default navSlice.reducer;
