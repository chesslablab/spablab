import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { wsMssgStartLoadpgn, wsMssgQuit } from '../../actions/serverActions';
import loadPgnDialogActions from '../../constants/dialog/loadPgnDialogActionTypes';

const LoadPgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch({ type: loadPgnDialogActions.CLOSE });
    wsMssgQuit(state).then(() => wsMssgStartLoadpgn(state, event.target.elements.pgn.value));
  };

  return (
    <Dialog open={state.loadPgnDialog.open} maxWidth="sm" fullWidth={true}>
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
          />
          <DialogActions>
            <Button type="submit">Load</Button>
            <Button onClick={() => dispatch({ type: loadPgnDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadPgnDialog;
