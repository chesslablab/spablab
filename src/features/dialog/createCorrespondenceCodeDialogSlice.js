import { createSlice } from '@reduxjs/toolkit';

const createCorrespondenceCodeDialogSlice = createSlice({
  name: 'createCorrespondenceCodeDialog',
  initialState: {
    open: false
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    }
  }
});

export const {
  open,
  close
} = createCorrespondenceCodeDialogSlice.actions;
export default createCorrespondenceCodeDialogSlice.reducer;
