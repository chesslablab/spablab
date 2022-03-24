import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import fenDialogActionTypes from '../../constants/dialog/fenDialogActionTypes';

const FenDialog = () => {
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
            value={state.board.fen ? state.board.fen : ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <DialogActions>
            <Button onClick={() => {
                state.board.fen ? navigator.clipboard.writeText(state.board.fen) : null;
                dispatch({ type: fenDialogActionTypes.CLOSE });
            }}>
              Copy FEN
            </Button>
            <Button onClick={() => dispatch({ type: fenDialogActionTypes.CLOSE })}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FenDialog;
