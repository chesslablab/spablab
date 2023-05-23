import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false
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
