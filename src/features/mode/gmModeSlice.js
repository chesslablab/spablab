import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  gm: {}
};

const gmModeSlice = createSlice({
  name: 'gmMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.gm = action.payload;
    }
  }
});

export const {
  start,
  set
} = gmModeSlice.actions;
export default gmModeSlice.reducer;
