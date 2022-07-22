import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import Pgn from '../../common/Pgn';
import { closePlayGmDialog } from '../../features/dialog/playGmDialogSlice';
import WsAction from '../../ws/WsAction';

const PlayGmDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    dispatch(closePlayGmDialog());
    WsAction.quit(state).then(() => WsAction.startGm(state, color));
  }

  return (
    <Dialog open={state.playGmDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Guess the move</DialogTitle>
      <DialogContent>
        <form onSubmit={handlePlay}>
          <TextField
            select
            fullWidth
            name="color"
            label="Color"
            defaultValue="rand"
            margin="normal"
          >
            <MenuItem key={0} value="rand">
              Random
            </MenuItem>
            <MenuItem key={1} value={Pgn.symbol.WHITE}>
              White
            </MenuItem>
            <MenuItem key={2} value={Pgn.symbol.BLACK}>
              Black
            </MenuItem>
          </TextField>
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(closePlayGmDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlayGmDialog;
