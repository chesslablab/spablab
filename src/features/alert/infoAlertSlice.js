import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mssg: null,
  open: false,
  button: false,
};

const infoAlertSlice = createSlice({
  name: 'infoAlert',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true;
      state.mssg = action.payload.mssg;
      state.button = action.payload.button ?? true;
    }
  }
});

export const { close, show } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
