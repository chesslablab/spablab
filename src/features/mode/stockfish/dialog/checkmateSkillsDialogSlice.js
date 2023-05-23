import { createSlice } from '@reduxjs/toolkit';

const checkmateSkillsDialogSlice = createSlice({
  name: 'checkmateSkillsDialog',
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
} = checkmateSkillsDialogSlice.actions;
export default checkmateSkillsDialogSlice.reducer;
