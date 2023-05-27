import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mssg: null,
  open: false
};

const infoAlertSlice = createSlice({
  name: 'infoAlert',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true;
      state.mssg = action.payload.mssg;
    }
  }
});

export const { close, show } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
