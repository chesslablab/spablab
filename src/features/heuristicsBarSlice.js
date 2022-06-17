import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null
};

const heuristicsBarSlice = createSlice({
  name: 'heuristicsBar',
  initialState,
  reducers: {
    resetBar: () => initialState,
    updateBar(state, action) {
      state.heuristics = action.payload;
    }
  }
});

export const {
  resetBar,
  updateBar
} = heuristicsBarSlice.actions;
export default heuristicsBarSlice.reducer;
