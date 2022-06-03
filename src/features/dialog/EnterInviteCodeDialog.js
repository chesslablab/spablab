import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import modeActionTypes from '../../constants/modeActionTypes';
import { enterInviteCodeDialogClose } from '../../features/dialog/enterInviteCodeDialogSlice';
import WsAction from '../../ws/WsAction';

const EnterInviteCodeDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    WsAction.quit(state).then(() => {
      WsAction.accept(state, event.target.elements.hash.value).then(() => {
        dispatch({ type: modeActionTypes.SET_ANALYSIS });
        dispatch(enterInviteCodeDialogClose());
      });
    });
  };

  return (
    <Dialog open={state.enterInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogContent>
        <form onSubmit={handlePlay}>
          <TextField fullWidth required name="hash" label="Invite code" />
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(enterInviteCodeDialogClose())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnterInviteCodeDialog;
