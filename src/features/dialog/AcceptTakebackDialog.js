import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { closeAcceptTakebackDialog } from '../../features/dialog/acceptTakebackDialogSlice';
import WsAction from '../../ws/WsAction';

const AcceptTakebackDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    WsAction.takeback(state, Wording.verb.ACCEPT.toLowerCase());
    WsAction.undo(state);
    dispatch(closeAcceptTakebackDialog());
  };

  const handleTakebackDecline = (event) => {
    event.preventDefault();
    WsAction.takeback(state, Wording.verb.DECLINE.toLowerCase());
    dispatch(closeAcceptTakebackDialog());
  };

  return (
    <Dialog
      open={state.acceptTakebackDialog.open}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>A takeback is being proposed</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(closeAcceptTakebackDialog())}>
              Decline
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptTakebackDialog;
