import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false
};

const createInboxCodeDialogSlice = createSlice({
  name: 'createCorrespondenceCodeDialog',
  initialState,
  reducers: {
    close: () => initialState,
    open(state) {
      state.open = true;
    },
    setCorresp(state, action) {
      state.inbox = action.payload;
    }
  }
});

export const {
  open,
  close,
  setCorresp
} = createInboxCodeDialogSlice.actions;
export default createInboxCodeDialogSlice.reducer;
