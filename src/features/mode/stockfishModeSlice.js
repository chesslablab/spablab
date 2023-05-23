import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  computer: {}
};

const stockfishModeSlice = createSlice({
  name: 'stockfishMode',
  initialState,
  reducers: {
    start: () => initialState,
    set(state, action) {
      state.active = true;
      state.computer = action.payload;
    }
  }
});

export const {
  start,
  set
} = stockfishModeSlice.actions;
export default stockfishModeSlice.reducer;
