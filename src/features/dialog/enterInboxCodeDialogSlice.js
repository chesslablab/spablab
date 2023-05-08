import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  inbox: null
};

const enterInboxCodeDialogSlice = createSlice({
  name: 'enterCorrespondenceCodeDialog',
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
} = enterInboxCodeDialogSlice.actions;
export default enterInboxCodeDialogSlice.reducer;
