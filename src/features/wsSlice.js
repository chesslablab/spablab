import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ws: null
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionError: () => initialState,
    wsConnectionEstablished(state, action) {
      state.ws = action.payload.ws;
    }
  }
});

export const {
  wsConnectionError,
  wsConnectionEstablished
} = wsSlice.actions;
export default wsSlice.reducer;
