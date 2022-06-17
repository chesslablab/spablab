import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ws: null
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnError: () => initialState,
    wsConnEstablished(state, action) {
      state.ws = action.payload.ws;
    }
  }
});

export const {
  wsConnError,
  wsConnEstablished
} = wsSlice.actions;
export default wsSlice.reducer;
