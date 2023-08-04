import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const eventAutocompleteSlice = createSlice({
  name: 'autocompleteEvents',
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
} = eventAutocompleteSlice.actions;
export default eventAutocompleteSlice.reducer;
