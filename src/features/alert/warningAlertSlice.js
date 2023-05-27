import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mssg: null,
  open: false
};

const warningAlertSlice = createSlice({
  name: 'warningAlert',
  initialState,
  reducers: {
    close: () => initialState,
    show(state, action) {
      state.open = true;
      state.mssg = action.payload.mssg;
    }
  }
});

export const { close, show } = warningAlertSlice.actions;
export default warningAlertSlice.reducer;
