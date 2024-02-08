import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  msg: null,
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
      state.msg = action.payload.msg;
      state.button = action.payload.button ?? true;
    }
  }
});

export const { close, show } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
