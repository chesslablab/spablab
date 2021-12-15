import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Wording from "../../utils/Wording.js";
import { useDispatch, useSelector } from "react-redux";
import { wsMssgRematch } from "../../actions/serverActions";
import rematchAcceptDialogActionTypes from "../../constants/rematchAcceptDialogActionTypes";
import modeActionTypes from "../../constants/modeActionTypes";

const RematchAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchAccept = (event) => {
    event.preventDefault();
    wsMssgRematch(state, Wording.verb.ACCEPT.toLowerCase()).then((data) => {
      dispatch({ type: rematchAcceptDialogActionTypes.CLOSE });
    });
  };

  const handleRematchDecline = (event) => {
    event.preventDefault();
    wsMssgRematch(state, Wording.verb.DECLINE.toLowerCase()).then(() => {
      dispatch({ type: rematchAcceptDialogActionTypes.CLOSE });
    });
  };

  return (
    <Dialog open={state.rematchAcceptDialog.open} maxWidth="sm" fullWidth={true}>
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

export default RematchAcceptDialog;
