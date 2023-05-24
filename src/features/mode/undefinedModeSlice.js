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
    reset: () => initialState,
    set(state) {
      state.active = true;
    }
  }
});

export const {
  reset,
  set
} = undefinedModeSlice.actions;
export default undefinedModeSlice.reducer;
