import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { wsMssgStartLoadfen, wsMssgQuit } from '../actions/serverActions';
import requestTakebackDialogActionTypes from '../constants/requestTakebackDialogActionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const RequestTakebackDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleTakeback = (event) => {
    event.preventDefault();
    wsMssgQuit(state).then(() => {
      wsMssgStartLoadfen(state, event.target.elements.takeback.value).then(() => {
        dispatch({ type: requestTakebackDialogActionTypes.CLOSE });
      });
    });
  }

  return (
    <Dialog open={state.requestTakebackDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>The opponent proposed a takeback</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleTakeback}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: requestTakebackDialogActionTypes.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RequestTakebackDialog;
