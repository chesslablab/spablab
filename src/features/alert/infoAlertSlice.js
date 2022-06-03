import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  open: false
};

const infoAlertSlice = createSlice({
  name: 'infoAlert',
  initialState: initialState,
  reducers: {
    infoAlertDisplay(state, action) {
      state.open = true,
      state.info = action.payload.info;
    },
    infoAlertClose(state) {
      state = initialState;
    }
  }
});

export const { infoAlertClose, infoAlertDisplay } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
