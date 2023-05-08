import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false
};

const createCorrespondenceCodeDialogSlice = createSlice({
  name: 'createCorrespondenceCodeDialog',
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
} = createCorrespondenceCodeDialogSlice.actions;
export default createCorrespondenceCodeDialogSlice.reducer;
