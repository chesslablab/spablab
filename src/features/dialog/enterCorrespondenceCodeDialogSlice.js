import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  corresp: null
};

const enterCorrespondenceCodeDialogSlice = createSlice({
  name: 'enterCorrespondenceCodeDialog',
  initialState,
  reducers: {
    close: () => initialState,
    open(state) {
      state.open = true;
    },
    setCorresp(state, action) {
      state.corresp = action.payload;
    }
  }
});

export const {
  open,
  close,
  setCorresp
} = enterCorrespondenceCodeDialogSlice.actions;
export default enterCorrespondenceCodeDialogSlice.reducer;
