import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const playerAutocompleteSlice = createSlice({
  name: 'autocompletePlayers',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.data = action.payload;
    }
  },
});

export const {
  reset,
  set
} = playerAutocompleteSlice.actions;
export default playerAutocompleteSlice.reducer;
