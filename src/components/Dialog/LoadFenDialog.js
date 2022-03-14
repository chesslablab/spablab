import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { wsMssgStartLoadfen, wsMssgQuit } from '../../actions/serverActions';
import loadFenDialogActions from '../../constants/dialog/loadFenDialogActionTypes';

const LoadFenDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch({ type: loadFenDialogActions.CLOSE });
    wsMssgQuit(state).then(() => wsMssgStartLoadfen(state, event.target.elements.fen.value));
  };

  return (
    <Dialog open={state.loadFenDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Load FEN</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField fullWidth required name="fen" label="FEN string" />
          <DialogActions>
            <Button type="submit">Load</Button>
            <Button onClick={() => dispatch({ type: loadFenDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadFenDialog;
