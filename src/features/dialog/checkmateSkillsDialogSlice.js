import { createSlice } from '@reduxjs/toolkit';

const checkmateSkillsDialogSlice = createSlice({
  name: 'checkmateSkillsDialog',
  initialState: {
    open: false
  },
  reducers: {
    openCheckmateSkillsDialog(state) {
      state.open = true;
    },
    closeCheckmateSkillsDialog(state) {
      state.open = false;
    }
  }
});

export const { openCheckmateSkillsDialog, closeCheckmateSkillsDialog } = checkmateSkillsDialogSlice.actions;
export default checkmateSkillsDialogSlice.reducer;
