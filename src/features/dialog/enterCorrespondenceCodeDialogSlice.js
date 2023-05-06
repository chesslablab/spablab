import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  game: null
};

const enterCorrespondenceCodeDialogSlice = createSlice({
  name: 'enterCorrespondenceCodeDialog',
  initialState,
  reducers: {
    close: () => initialState,
    open(state) {
      state.open = true;
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
