import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { wsMssgQuit } from '../actions/serverActions';
import boardActionTypes from '../constants/boardActionTypes';
import loadPgnDialogActions from '../constants/loadPgnDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const LoadPgnDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLoad = (event) => {
    event.preventDefault();
    // TODO
    dispatch({ type: loadPgnDialogActions.CLOSE });
  }

  return (
    <Dialog open={state.loadPgnDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Load PGN</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleLoad}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            name="pgn"
            label="Movetext"
          />
          <DialogActions>
            <Button type="submit">
              Load
            </Button>
            <Button onClick={() => dispatch({ type: loadPgnDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoadPgnDialog;
