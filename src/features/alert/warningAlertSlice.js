import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  msg: null,
  open: false
};

const warningAlertSlice = createSlice({
  name: 'warningAlert',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true;
      state.msg = action.payload.msg;
    }
  }
});

export const { close, show } = warningAlertSlice.actions;
export default warningAlertSlice.reducer;
