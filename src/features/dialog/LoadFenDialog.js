import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { loadFenDialogClose } from '../../features/dialog/loadFenDialogSlice';
import { progressDialogOpen } from '../../features/dialog/progressDialogSlice';
import WsAction from '../../ws/WsAction';

const LoadFenDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(loadFenDialogClose());
    dispatch(progressDialogOpen());
    WsAction.quit(state).then(() => WsAction.startLoadfen(state, event.target.elements.fen.value));
  };

  return (
    <Dialog open={state.loadFenDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Load FEN</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField fullWidth required name="fen" label="FEN string" />
          <DialogActions>
            <Button type="submit">Load</Button>
            <Button onClick={() => dispatch(loadFenDialogClose())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadFenDialog;
