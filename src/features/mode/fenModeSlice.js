import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  fen: ''
};

const fenModeSlice = createSlice({
  name: 'fenMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.fen = action.payload.fen;
    }
  }
});

export const {
  start,
  set
} = fenModeSlice.actions;
export default fenModeSlice.reducer;
