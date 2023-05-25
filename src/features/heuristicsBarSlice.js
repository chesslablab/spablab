import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null
};

const heuristicsBarSlice = createSlice({
  name: 'heuristicsBar',
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
} = heuristicsBarSlice.actions;
export default heuristicsBarSlice.reducer;
