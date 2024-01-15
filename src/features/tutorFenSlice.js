import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  explanation: null
};

const tutorFenSlice = createSlice({
  name: 'tutorFen',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.explanation = action.payload;
    }
  }
});

export const {
  reset,
  set
} = tutorFenSlice.actions;
export default tutorFenSlice.reducer;
