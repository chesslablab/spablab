import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null
};

const heuristicsSlice = createSlice({
  name: 'heuristics',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.heuristics = action.payload;
    }
  }
});

export const {
  reset,
  set
} = heuristicsSlice.actions;
export default heuristicsSlice.reducer;
