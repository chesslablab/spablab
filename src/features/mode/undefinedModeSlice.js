import { createSlice } from '@reduxjs/toolkit';
import * as modeConst from 'features/mode/modeConst';

const initialState = {
  active: false,
  name: modeConst.UNDEFINED
};

const undefinedModeSlice = createSlice({
  name: 'undefinedMode',
  initialState,
  reducers: {
    start: () => initialState
  }
});

export const {
  start
} = undefinedModeSlice.actions;
export default undefinedModeSlice.reducer;
