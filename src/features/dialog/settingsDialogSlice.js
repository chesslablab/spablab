import { createSlice } from '@reduxjs/toolkit';

const settingsDialogSlice = createSlice({
  name: 'settingsDialog',
  initialState: {
    open: false,
    fields: {
      pieceAnimation: 'on',
      heuristics: 'off'
    }
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
    accept(state, action) {
      state.fields = {
        ...state.fields,
        ...action.payload
      };
    }
  }
});

export const {
  open,
  close,
  accept
} = settingsDialogSlice.actions;
export default settingsDialogSlice.reducer;
