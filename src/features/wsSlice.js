import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ws: null
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionEstablished(state, action) {
      state.ws = action.payload.ws;
    },
    wsConnectionError(state) {
      state = initialState;
    }
  }
});

export const {
  wsConnectionEstablished,
  wsConnectionError
} = wsSlice.actions;
export default wsSlice.reducer;
