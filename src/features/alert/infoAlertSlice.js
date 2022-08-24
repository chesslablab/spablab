import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  open: false
};

const infoAlertSlice = createSlice({
  name: 'infoAlert',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true;
      state.info = action.payload.info;
    }
  }
});

export const { close, show } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
