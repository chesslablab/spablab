import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { wsMssgFen, wsMssgQuit } from '../actions/serverActions';
import fenDialogActions from '../constants/fenDialogActionTypes';

const GetFenDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleGet = () => {
    wsMssgFen(state);
  }

  return (
    <Dialog open={state.fenDialog.open} onEntered={handleGet} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Get FEN</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            name="fen"
            label="FEN string"
            disabled
            value = {state.fenDialog.fen ? state.fenDialog.fen : "NOT RECEIVED"}
          />
          <DialogActions>
            <Button onClick={() => {
                if(state.fenDialog.fen) navigator.clipboard.writeText(state.fenDialog.fen);
                dispatch({ type: fenDialogActions.CLOSE });
            }}>
              Copy FEN
            </Button>
            <Button onClick={() => dispatch({ type: fenDialogActions.CLOSE })}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GetFenDialog;
