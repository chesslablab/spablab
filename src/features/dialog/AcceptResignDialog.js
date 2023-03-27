import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Wording from '../../common/Wording.js';
import * as acceptResignDialog from '../../features/dialog/acceptResignDialogSlice';
import * as mode from '../../features/mode/modeSlice';
import WsAction from '../../features/ws/WsAction';

const AcceptResignDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleResignAccept = (event) => {
    event.preventDefault();
    WsAction.resign(state, Wording.verb.ACCEPT.toLowerCase());
    dispatch(mode.acceptResign());
    dispatch(acceptResignDialog.close());
  };

  return (
    <Dialog open={state.acceptResignDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Resign</DialogTitle>
      <DialogContent>
        <form onSubmit={handleResignAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(acceptResignDialog.close())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptResignDialog;
