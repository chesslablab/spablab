import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import fenDialogActions from '../../constants/fenDialogActionTypes';

const GetFenDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.fenDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>FEN</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            name="fen"
            disabled
            value={state.fenDialog.fen}
          />
          <DialogActions>
            <Button onClick={() => {
                state.fenDialog.fen ? navigator.clipboard.writeText(state.fenDialog.fen) : null;
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
