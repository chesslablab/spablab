import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as loadFenDialog from '../../features/dialog/loadFenDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import WsAction from '../../ws/WsAction';

const LoadFenDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(mainButtons.setAnalysis());
    dispatch(loadFenDialog.close());
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    WsAction.startFen(state, event.target.elements.fen.value);
  };

  return (
    <Dialog open={state.loadFenDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Load FEN</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField fullWidth required name="fen" label="FEN string" />
          <DialogActions>
            <Button type="submit">Load</Button>
            <Button onClick={() => dispatch(loadFenDialog.close())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadFenDialog;
