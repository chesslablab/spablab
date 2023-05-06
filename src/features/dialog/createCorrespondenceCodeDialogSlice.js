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
    setCorrespondence(state, action) {
      state.correspondence = action.payload;
    }
  }
});

export const {
  open,
  close,
  setCorrespondence
} = createCorrespondenceCodeDialogSlice.actions;
export default createCorrespondenceCodeDialogSlice.reducer;
