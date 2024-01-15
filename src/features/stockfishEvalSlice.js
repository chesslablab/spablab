import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eval: {}
};

const stockfishEvalSlice = createSlice({
  name: 'stockfishEval',
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
} = stockfishEvalSlice.actions;
export default stockfishEvalSlice.reducer;
