import { createSlice } from '@reduxjs/toolkit';

const playLikeGrandmasterDialogSlice = createSlice({
  name: 'playLikeGrandmasterDialog',
  initialState: {
    open: false
  },
  reducers: {
    playLikeGrandmasterDialogOpen(state) {
      state.open = true;
    },
    playLikeGrandmasterDialogClose(state) {
      state.open = false;
    }
  }
});

export const {
  playLikeGrandmasterDialogOpen,
  playLikeGrandmasterDialogClose
} = playLikeGrandmasterDialogSlice.actions;
export default playLikeGrandmasterDialogSlice.reducer;
