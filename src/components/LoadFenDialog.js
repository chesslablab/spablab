import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { startBoard } from '../actions/boardActions';
import { wsMssgStartLoadfen, wsMssgQuit } from '../actions/serverActions';
import boardActionTypes from '../constants/boardActionTypes';
import loadFenDialogActions from '../constants/loadFenDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const LoadFenDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLoad = (event) => {
    event.preventDefault();
    wsMssgQuit(state).then(() => {
      wsMssgStartLoadfen(state, event.target.elements.fen.value).then(() => {
        dispatch({ type: modeActionTypes.SET_LOADFEN });
        dispatch({
          type: boardActionTypes.START_FEN,
          payload: {
            fen: event.target.elements.fen.value
          }
        });
        dispatch({ type: loadFenDialogActions.CLOSE });
      });
    });
  }

  return (
    <Dialog open={state.loadFenDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Load FEN</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleLoad}>
          <TextField
            fullWidth
            required
            name="fen"
            label="FEN string"
          />
          <DialogActions>
            <Button type="submit">
              Load
            </Button>
            <Button onClick={() => dispatch({ type: loadFenDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoadFenDialog;
