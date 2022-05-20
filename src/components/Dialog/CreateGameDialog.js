import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import createGameDialogActionTypes from '../../constants/dialog/createGameDialogActionTypes';
import Pgn from '../../utils/Pgn';
import WsAction from '../../ws/WsAction';

const CreateGameDialog = () => {
  const state = useSelector(state => state);

  return (
    <Dialog open={state.createGameDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Create game</DialogTitle>
        <CreateCode />
    </Dialog>
  );
}

const CreateCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    let time = event.target.elements.time.value;
    let increment = event.target.elements.increment.value;
    // TODO
    // Implement WsAction.startPlayonline
    // WsAction.quit(state).then(() => WsAction.startPlayfriend(state, color, time, increment));
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <Typography id="input-minutes" gutterBottom>
          Minutes per side
        </Typography>
        <Slider
          name="time"
          aria-label="Minutes"
          defaultValue={5}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={60}
        />
        <Typography id="input-increment" gutterBottom>
          Increment in seconds
        </Typography>
        <Slider
          name="increment"
          aria-label="Increment"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={60}
        />
        <TextField
          select
          fullWidth
          margin="dense"
          name="color"
          label="Color"
          defaultValue="rand"
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
          <Button type="submit">
            Create Game
          </Button>
          <Button onClick={() => dispatch({ type: createGameDialogActionTypes.CLOSE })}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </DialogContent>
  );
}

export default CreateGameDialog;
