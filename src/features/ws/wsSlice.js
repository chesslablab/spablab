import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conn: null
};

const wsSlice = createSlice({
  name: 'conn',
  initialState,
  reducers: {
    error: () => initialState,
    established(state, action) {
      state.ws = action.payload.ws;
    }
  }
});

export const {
  error,
  established
} = wsSlice.actions;
export default wsSlice.reducer;
