import { createSlice } from '@reduxjs/toolkit';
import {
  MAIN_BUTTON_ANALYSIS,
  MAIN_BUTTON_PLAY_ONLINE,
  MAIN_BUTTON_PLAY_A_FRIEND,
  MAIN_BUTTON_PLAY_COMPUTER,
  MAIN_BUTTON_TRAINING,
  MAIN_BUTTON_OPENING_SEARCH
} from './mainButtonsConstants';

const initialState = {
  name: MAIN_BUTTON_ANALYSIS,
};

const mainButtonsSlice = createSlice({
  name: 'mainButtons',
  initialState,
  reducers: {
    setAnalysis: () => initialState,
    setPlayOnline: (state) => {
      state.name = MAIN_BUTTON_PLAY_ONLINE;
    },
    setPlayAFriend: (state) => {
      state.name = MAIN_BUTTON_PLAY_A_FRIEND;
    },
    setPlayComputer: (state) => {
      state.name = MAIN_BUTTON_PLAY_COMPUTER;
    },
    setTraining: (state) => {
      state.name = MAIN_BUTTON_TRAINING;
    },
    setOpeningSearch: (state) => {
      state.name = MAIN_BUTTON_OPENING_SEARCH;
    }
  }
});

export const {
  setAnalysis,
  setPlayOnline,
  setPlayAFriend,
  setPlayComputer,
  setTraining,
  setOpeningSearch
} = mainButtonsSlice.actions;
export default mainButtonsSlice.reducer;
