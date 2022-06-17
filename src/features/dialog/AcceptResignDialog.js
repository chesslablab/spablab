import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Wording from '../../common/Wording.js';
import { closeResignAcceptDialog } from '../../features/dialog/acceptResignDialogSlice';
import { acceptResign } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const AcceptResignDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleResignAccept = (event) => {
    event.preventDefault();
    WsAction.resign(state, Wording.verb.ACCEPT.toLowerCase()).then((data) => {
      dispatch(acceptResign());
      dispatch(closeResignAcceptDialog());
    });
  };

  return (
    <Dialog open={state.acceptResignDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Resign</DialogTitle>
      <DialogContent>
        <form onSubmit={handleResignAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(closeResignAcceptDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptResignDialog;
