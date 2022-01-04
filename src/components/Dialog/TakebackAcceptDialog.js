import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Wording from "../../utils/Wording.js";
import { useDispatch, useSelector } from "react-redux";
import { wsMssgTakeback, wsMssgUndoMove } from "../../actions/serverActions";
import takebackAcceptDialogActionTypes from "../../constants/takebackAcceptDialogActionTypes";
import modeActionTypes from "../../constants/modeActionTypes";

const TakebackAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    wsMssgTakeback(state, Wording.verb.ACCEPT.toLowerCase()).then(() => {
      wsMssgUndoMove(state).then(() => {
        dispatch({ type: takebackAcceptDialogActionTypes.CLOSE });
      });
    });
  };

  const handleTakebackDecline = (event) => {
    event.preventDefault();
    wsMssgTakeback(state, Wording.verb.DECLINE.toLowerCase()).then(() => {
      dispatch({ type: takebackAcceptDialogActionTypes.CLOSE });
    });
  };

  return (
    <Dialog
      open={state.takebackAcceptDialog.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>A takeback is being proposed</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button
              onClick={() =>
                dispatch({ type: takebackAcceptDialogActionTypes.CLOSE })
              }
            >
              Decline
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TakebackAcceptDialog;
