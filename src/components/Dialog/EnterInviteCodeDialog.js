import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import enterInviteCodeDialogActions from "../../constants/enterInviteCodeDialogActionTypes";
import { wsMssgAccept, wsMssgQuit } from "../../actions/serverActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const EnterInviteCodeDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePlay = (event) => {
    event.preventDefault();
    wsMssgQuit(state).then(() => {
      wsMssgAccept(state, event.target.elements.hash.value).then(() => {
        dispatch({ type: enterInviteCodeDialogActions.CLOSE });
      });
    });
  };

  return (
    <Dialog open={state.enterInviteCodeDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Enter invite code</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handlePlay}>
          <TextField fullWidth required name="hash" label="Code" />
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button
              onClick={() =>
                dispatch({ type: enterInviteCodeDialogActions.CLOSE })
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

export default EnterInviteCodeDialog;
