import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false
};

const pgnModeSlice = createSlice({
  name: 'pgnMode',
  initialState,
  reducers: {
    start: () => initialState
  }
});

export const {
  start
} = pgnModeSlice.actions;
export default pgnModeSlice.reducer;
