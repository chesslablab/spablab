import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eval: {}
};

const positionEvalSlice = createSlice({
  name: 'positionEval',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.eval = action.payload;
    }
  }
});

export const {
  reset,
  set
} = positionEvalSlice.actions;
export default positionEvalSlice.reducer;
