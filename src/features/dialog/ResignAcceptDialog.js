import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import modeActionTypes from "../../constants/modeActionTypes";
import { resignAcceptDialogClose } from '../../features/dialog/resignAcceptDialogSlice';
import Wording from "../../utils/Wording.js";
import WsAction from '../../ws/WsAction';

const ResignAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleResignAccept = (event) => {
    event.preventDefault();
    WsAction.resign(state, Wording.verb.ACCEPT.toLowerCase()).then((data) => {
      dispatch({ type: modeActionTypes.PLAY_RESIGN_ACCEPT });
      dispatch(resignAcceptDialogClose());
    });
  };

  return (
    <Dialog open={state.resignAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Resign</DialogTitle>
      <DialogContent>
        <form onSubmit={handleResignAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(resignAcceptDialogClose())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResignAcceptDialog;
