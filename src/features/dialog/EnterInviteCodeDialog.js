import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { closeEnterInviteCodeDialog } from '../../features/dialog/enterInviteCodeDialogSlice';
import { setPlayAFriend } from '../../features/mainButtonsSlice';
import { startAnalysis } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const EnterInviteCodeDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    dispatch(setPlayAFriend());
    WsAction.accept(state, event.target.elements.hash.value);
    dispatch(startAnalysis());
    dispatch(closeEnterInviteCodeDialog());
  };

  return (
    <Dialog open={state.enterInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Enter invite code</DialogTitle>
      <DialogContent>
        <form onSubmit={handlePlay}>
          <TextField fullWidth required name="hash" label="Invite code" />
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(closeEnterInviteCodeDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnterInviteCodeDialog;
