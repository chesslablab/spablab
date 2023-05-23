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
    }
  }
});

export const {
  setAnalysis,
  setPlay,
  setTraining,
  setOpeningSearch,
  setDatabase
} = mainButtonsSlice.actions;
export default mainButtonsSlice.reducer;
