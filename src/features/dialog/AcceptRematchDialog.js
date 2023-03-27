import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import * as acceptRematchDialog from '../../features/dialog/acceptRematchDialogSlice';
import WsAction from '../../features/ws/WsAction';

const AcceptRematchDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchAccept = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.ACCEPT.toLowerCase());
    dispatch(acceptRematchDialog.close());
    WsAction.restart(state);
  };

  const handleRematchDecline = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.DECLINE.toLowerCase());
    dispatch(acceptRematchDialog.close());
  };

  return (
    <Dialog open={state.acceptRematchDialog.open} maxWidth="xs" fullWidth={true}>
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

export default AcceptRematchDialog;
