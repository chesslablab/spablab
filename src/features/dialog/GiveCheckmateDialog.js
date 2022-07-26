import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import Pgn from '../../common/Pgn';
import { closeGiveCheckmateDialog } from '../../features/dialog/giveCheckmateDialogSlice';
import WsAction from '../../ws/WsAction';

const GiveCheckmateDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    dispatch(closeGiveCheckmateDialog());
    WsAction.quit(state).then(() => WsAction.randomCheckmate(state, color, event.target.elements.type.value));
  }

  return (
    <Dialog open={state.giveCheckmateDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Give a checkmate</DialogTitle>
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
          <TextField
            select
            fullWidth
            required
            name="type"
            label="Select an option"
            defaultValue=""
            margin="normal"
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem key={0} value="R">
              King and rook vs. king
            </MenuItem>
            <MenuItem key={1} value="BB">
              King and two bishops vs. king
            </MenuItem>
            <MenuItem key={2} value="BN">
              King and bishop and knight vs. king
            </MenuItem>
          </TextField>
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(closeGiveCheckmateDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GiveCheckmateDialog;
