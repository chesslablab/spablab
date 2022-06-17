import { createSlice } from '@reduxjs/toolkit';

const playLikeGrandmasterDialogSlice = createSlice({
  name: 'playLikeGrandmasterDialog',
  initialState: {
    open: false
  },
  reducers: {
    openPlayLikeGrandmasterDialog(state) {
      state.open = true;
    },
    closePlayLikeGrandmasterDialog(state) {
      state.open = false;
    }
  }
});

export const {
  openPlayLikeGrandmasterDialog,
  closePlayLikeGrandmasterDialog
} = playLikeGrandmasterDialogSlice.actions;
export default playLikeGrandmasterDialogSlice.reducer;
