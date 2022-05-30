import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import resignAcceptDialogActionTypes from "../../constants/dialog/resignAcceptDialogActionTypes";
import modeActionTypes from "../../constants/modeActionTypes";
import Wording from "../../utils/Wording.js";
import WsAction from '../../ws/WsAction';

const ResignAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleResignAccept = (event) => {
    event.preventDefault();
    WsAction.resign(state, Wording.verb.ACCEPT.toLowerCase()).then((data) => {
      dispatch({ type: modeActionTypes.PLAY_RESIGN_ACCEPT });
      dispatch({ type: resignAcceptDialogActionTypes.CLOSE });
    });
  };

  return (
    <Dialog open={state.resignAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Resign</DialogTitle>
      <DialogContent>
        <form onSubmit={handleResignAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button
              onClick={() =>
                dispatch({ type: resignAcceptDialogActionTypes.CLOSE })
              }
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResignAcceptDialog;
