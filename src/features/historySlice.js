import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  back: 0
};

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    historyGoTo(state, action) {
      state.back = 0 - action.payload.back;
    },
    historyGoBack(state) {
      state.back = state.back - 1;
    },
    historyGoForward(state) {
      state.back = state.back + 1;
    },
    historyGoToEnd(state) {
      state.back = 0;
    }
  }
});

export const {
  historyGoTo,
  historyGoBack,
  historyGoForward,
  historyGoToEnd
} = historySlice.actions;
export default historySlice.reducer;
