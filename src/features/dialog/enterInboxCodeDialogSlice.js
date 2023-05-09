import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  inbox: null
};

const enterInboxCodeDialogSlice = createSlice({
  name: 'enterInboxCodeDialog',
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
} = enterInboxCodeDialogSlice.actions;
export default enterInboxCodeDialogSlice.reducer;
