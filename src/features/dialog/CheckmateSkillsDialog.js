import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import Pgn from '../../common/Pgn';
import { closeCheckmateSkillsDialog } from '../../features/dialog/checkmateSkillsDialogSlice';
import { setTraining } from '../../features/mainButtonsSlice';
import WsAction from '../../ws/WsAction';

const CheckmateSkillsDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    dispatch(setTraining());
    dispatch(closeCheckmateSkillsDialog());
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    WsAction.quit(state);
    WsAction.randomCheckmate(state, color, event.target.elements.type.value);
  }

  return (
    <Dialog open={state.checkmateSkillsDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Checkmate skills</DialogTitle>
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
            <MenuItem key={0} value="Q">
              King and queen vs. king
            </MenuItem>
            <MenuItem key={1} value="R">
              King and rook vs. king
            </MenuItem>
            <MenuItem key={2} value="BB">
              King and two bishops vs. king
            </MenuItem>
            <MenuItem key={3} value="BN">
              King and bishop and knight vs. king
            </MenuItem>
          </TextField>
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(closeCheckmateSkillsDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckmateSkillsDialog;
