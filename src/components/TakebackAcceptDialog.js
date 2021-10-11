import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { wsMssgTakeback } from '../actions/serverActions';
import takebackAcceptDialogActionTypes from '../constants/takebackAcceptDialogActionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const TakebackAcceptDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    wsMssgTakeback(state, 'accept').then((data) => {
      dispatch({ type: takebackAcceptDialogActionTypes.CLOSE });
    });
  }

  const handleTakebackDecline = (event) => {
    event.preventDefault();
    wsMssgTakeback(state, 'decline').then(() => {
      dispatch({ type: takebackAcceptDialogActionTypes.CLOSE });
    });
  }

  return (
    <Dialog open={state.takebackAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>The opponent proposed a takeback</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleTakebackAccept}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: takebackAcceptDialogActionTypes.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TakebackAcceptDialog;
