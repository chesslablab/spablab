import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { closeAcceptDrawDialog } from '../../features/dialog/acceptDrawDialogSlice';
import WsAction from '../../ws/WsAction';

const AcceptDrawDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawAccept = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.ACCEPT.toLowerCase());
    dispatch(closeAcceptDrawDialog());
  };

  const handleDrawDecline = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.DECLINE.toLowerCase());
    dispatch(closeAcceptDrawDialog());
  };

  return (
    <Dialog open={state.acceptDrawDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>A draw is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleDrawDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDrawDialog;
