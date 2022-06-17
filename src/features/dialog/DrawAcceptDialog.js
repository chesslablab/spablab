import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { closeDrawAcceptDialog } from '../../features/dialog/drawAcceptDialogSlice';
import WsAction from '../../ws/WsAction';

const DrawAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawAccept = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.ACCEPT.toLowerCase()).then((data) => {
      dispatch(closeDrawAcceptDialog());
    });
  };

  const handleDrawDecline = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.DECLINE.toLowerCase()).then(() => {
      dispatch(closeDrawAcceptDialog());
    });
  };

  return (
    <Dialog open={state.drawAcceptDialog.open} maxWidth="sm" fullWidth={true}>
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

export default DrawAcceptDialog;
