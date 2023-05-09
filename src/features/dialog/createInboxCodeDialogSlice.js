import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false
};

const createInboxCodeDialogSlice = createSlice({
  name: 'createInboxCodeDialog',
  initialState,
  reducers: {
    close: () => initialState,
    open(state) {
      state.open = true;
    },
    setInbox(state, action) {
      state.inbox = action.payload;
    }
  }
});

export const {
  open,
  close,
  setInbox
} = createInboxCodeDialogSlice.actions;
export default createInboxCodeDialogSlice.reducer;
