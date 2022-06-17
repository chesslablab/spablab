import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  back: 0
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    goTo(state, action) {
      state.back = 0 - action.payload.back;
    },
    goBack(state) {
      state.back = state.back - 1;
    },
    goForward(state) {
      state.back = state.back + 1;
    },
    goToEnd(state) {
      state.back = 0;
    }
  }
});

export const {
  goTo,
  goBack,
  goForward,
  goToEnd
} = historySlice.actions;
export default historySlice.reducer;
