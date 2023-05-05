import { createSlice } from '@reduxjs/toolkit';

const enterCorrespondenceCodeDialogSlice = createSlice({
  name: 'enterCorrespondenceCodeDialog',
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
} = enterCorrespondenceCodeDialogSlice.actions;
export default enterCorrespondenceCodeDialogSlice.reducer;
