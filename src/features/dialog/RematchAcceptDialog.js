import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { rematchAcceptDialogClose } from '../../features/dialog/rematchAcceptDialogSlice';
import WsAction from '../../ws/WsAction';

const RematchAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchAccept = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.ACCEPT.toLowerCase()).then(() => {
      dispatch(rematchAcceptDialogClose());
      WsAction.restart(state);
    });
  };

  const handleRematchDecline = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.DECLINE.toLowerCase()).then(() => {
      dispatch(rematchAcceptDialogClose());
    });
  };

  return (
    <Dialog open={state.rematchAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>A rematch is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleRematchDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RematchAcceptDialog;
