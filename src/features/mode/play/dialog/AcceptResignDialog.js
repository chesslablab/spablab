import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import WsAction from 'features/ws/WsAction';

const AcceptResignDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleResignAccept = (event) => {
    event.preventDefault();
    WsAction.resign(Wording.verb.ACCEPT.toLowerCase());
    dispatch(playMode.acceptResign());
    dispatch(playMode.acceptResignDialog({ open: false }));
  };

  return (
    <Dialog open={state.playMode.dialogs.acceptResign.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Resign</DialogTitle>
      <DialogContent>
        <form onSubmit={handleResignAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(playMode.acceptResignDialog({ open: false }))}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptResignDialog;
