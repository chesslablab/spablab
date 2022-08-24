import { createSlice } from '@reduxjs/toolkit';
import * as mainButtonConst from '../common/constants/mainButton';

const initialState = {
  name: mainButtonConst.ANALYSIS,
};

const mainButtonsSlice = createSlice({
  name: 'mainButtons',
  initialState,
  reducers: {
    setAnalysis: () => initialState,
    setPlayOnline: (state) => {
      state.name = mainButtonConst.PLAY_ONLINE;
    },
    setPlayAFriend: (state) => {
      state.name = mainButtonConst.PLAY_A_FRIEND;
    },
    setPlayComputer: (state) => {
      state.name = mainButtonConst.PLAY_COMPUTER;
    },
    setTraining: (state) => {
      state.name = mainButtonConst.TRAINING;
    },
    setOpeningSearch: (state) => {
      state.name = mainButtonConst.OPENING_SEARCH;
    },
    setDatabase: (state) => {
      state.name = mainButtonConst.MAIN_BUTTON_DATABASE;
    }
  }
});

export const {
  setAnalysis,
  setPlayOnline,
  setPlayAFriend,
  setPlayComputer,
  setTraining,
  setOpeningSearch,
  setDatabase
} = mainButtonsSlice.actions;
export default mainButtonsSlice.reducer;
