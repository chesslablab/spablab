import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heuristics: null
};

const heuristicsBarSlice = createSlice({
  name: 'heuristicsBar',
  initialState: initialState,
  reducers: {
    heuristicsBarReset(state) {
      state = initialState;
    },
    heuristicsBarUpdate(state, action) {
      state.heuristics = action.payload;
    }
  }
});

export const {
  heuristicsBarReset,
  heuristicsBarUpdate
} = heuristicsBarSlice.actions;
export default heuristicsBarSlice.reducer;
