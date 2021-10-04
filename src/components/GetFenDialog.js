import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { wsMssgStartGetfen, wsMssgQuit } from '../actions/serverActions';
import getFenDialogActions from '../constants/getFenDialogActionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const GetFenDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleGet = () => {
    wsMssgStartGetfen(state);
  }

  return (
    <Dialog open={state.getFenDialog.open} onEntered={handleGet} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Get FEN</DialogTitle>
      <DialogContent>
        <form className={classes.root} >
          <TextField
            fullWidth
            name="fen"
            label="FEN string"
            disabled
            value = {state.getFenDialog.fen ? state.getFenDialog.fen : "NOT RECEIVED"}
          />
          <DialogActions>
            <Button onClick={() => {
                if(state.getFenDialog.fen) navigator.clipboard.writeText(state.getFenDialog.fen);
                dispatch({ type: getFenDialogActions.CLOSE });
            }}>
              Copy FEN
            </Button>
            <Button onClick={() => dispatch({ type: getFenDialogActions.CLOSE })}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GetFenDialog;
