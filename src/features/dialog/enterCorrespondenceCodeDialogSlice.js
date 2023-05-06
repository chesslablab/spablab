import { createSlice } from '@reduxjs/toolkit';

const enterCorrespondenceCodeDialogSlice = createSlice({
  name: 'enterCorrespondenceCodeDialog',
  initialState: {
    open: false,
    game: null
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
    setGame(state, action) {
      state.game = action.payload;
    }
  }
});

export const {
  open,
  close,
  setGame
} = enterCorrespondenceCodeDialogSlice.actions;
export default enterCorrespondenceCodeDialogSlice.reducer;
