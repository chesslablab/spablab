import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  name: modeConst.STOCKFISH,
  variant: variantConst.CLASSICAL,
  fen: '',
  computer: {},
  dialogs: {
    checkmateSkills: {
      open: false,
    },
    endgameSkills: {
      open: false,
    },
    playComputer: {
      open: false,
    },
  },
  tables: {
    openingAnalysis: {
      open: false,
      rows: [],
    },
  },
};

const stockfishModeSlice = createSlice({
  name: 'stockfishMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.computer = action.payload;
    },
    checkmateSkillsDialog(state, action) {
      state.dialogs.checkmateSkills = action.payload;
    },
    endgameSkillsDialog(state, action) {
      state.dialogs.endgameSkills = action.payload;
    },
    playComputerDialog(state, action) {
      state.dialogs.playComputer = action.payload;
    },
  },
});

export const {
  start,
  set,
  checkmateSkillsDialog,
  endgameSkillsDialog,
  playComputerDialog
} = stockfishModeSlice.actions;
export default stockfishModeSlice.reducer;
