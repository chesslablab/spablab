import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as loadPgnDialog from '../../features/dialog/loadPgnDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import WsAction from '../../ws/WsAction';

const LoadPgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(mainButtons.setAnalysis());
    dispatch(loadPgnDialog.close());
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    WsAction.startPgn(state, event.target.elements.pgn.value);
  };

  return (
    <Dialog open={state.loadPgnDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Load PGN</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            name="pgn"
            label="Movetext"
            inputProps={{
              spellCheck: false
            }}
          />
          <DialogActions>
            <Button type="submit">Load</Button>
            <Button onClick={() => dispatch(loadPgnDialog.close())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadPgnDialog;
