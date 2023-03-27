import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ws: null
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    connError: () => initialState,
    connEstablished(state, action) {
      state.ws = action.payload.ws;
    }
  }
});

export const {
  connError,
  connEstablished
} = wsSlice.actions;
export default wsSlice.reducer;
