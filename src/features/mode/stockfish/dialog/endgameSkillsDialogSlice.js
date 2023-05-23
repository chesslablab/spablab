import { createSlice } from '@reduxjs/toolkit';

const endgameSkillsDialogSlice = createSlice({
  name: 'endgameSkillsDialog',
  initialState: {
    open: false
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    }
  }
});

export const {
  open,
  close
} = endgameSkillsDialogSlice.actions;
export default endgameSkillsDialogSlice.reducer;
