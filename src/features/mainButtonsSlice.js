import { createSlice } from '@reduxjs/toolkit';
import * as mainButtonsConst from 'features/mainButtonsConst';

const initialState = {
  name: mainButtonsConst.ANALYSIS,
};

const mainButtonsSlice = createSlice({
  name: 'mainButtons',
  initialState,
  reducers: {
    setAnalysis: () => initialState,
    setCorrespondence: (state) => {
      state.name = mainButtonsConst.CORRESPONDENCE;
    },
    setPlayOnline: (state) => {
      state.name = mainButtonsConst.PLAY_ONLINE;
    },
    setPlayAFriend: (state) => {
      state.name = mainButtonsConst.PLAY_A_FRIEND;
    },
    setPlayComputer: (state) => {
      state.name = mainButtonsConst.PLAY_COMPUTER;
    },
    setTraining: (state) => {
      state.name = mainButtonsConst.TRAINING;
    },
    setOpeningSearch: (state) => {
      state.name = mainButtonsConst.OPENING_SEARCH;
    },
    setDatabase: (state) => {
      state.name = mainButtonsConst.DATABASE;
    }
  }
});

export const {
  setAnalysis,
  setCorrespondence,
  setPlayOnline,
  setPlayAFriend,
  setPlayComputer,
  setTraining,
  setOpeningSearch,
  setDatabase
} = mainButtonsSlice.actions;
export default mainButtonsSlice.reducer;
