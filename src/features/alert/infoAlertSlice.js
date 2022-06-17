import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  open: false
};

const infoAlertSlice = createSlice({
  name: 'infoAlert',
  initialState,
  reducers: {
    closeInfoAlert: () => initialState,
    showInfoAlert(state, action) {
      state.open = true;
      state.info = action.payload.info;
    }
  }
});

export const { closeInfoAlert, showInfoAlert } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
