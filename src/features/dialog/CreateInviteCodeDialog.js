import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pgn from '../../common/Pgn';
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
import { closeCreateInviteCodeDialog } from '../../features/dialog/createInviteCodeDialogSlice';
import { setPlayAFriend } from '../../features/mainButtonsSlice';
import WsAction from '../../ws/WsAction';

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);

  return (
    <Dialog open={state.createInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Create invite code</DialogTitle>
      {state.mode.play && state.mode.play.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCreateCode = (event) => {
    event.preventDefault();
    dispatch(setPlayAFriend());
    const settings = {
      color: event.target.elements.color.value === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : event.target.elements.color.value,
      min: event.target.elements.min.value,
      increment: event.target.elements.increment.value,
      submode: 'friend'
    };
    WsAction.startPlay(state, settings);
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <Typography id="input-minutes" gutterBottom>
          Minutes per side
        </Typography>
        <Slider
          name="min"
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
            Create Code
          </Button>
          <Button onClick={() => dispatch(closeCreateInviteCodeDialog())}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        margin="dense"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.mode.play.hash}
      />
      <DialogActions>
        <Button onClick={() => {
          navigator.clipboard.writeText(state.mode.play.hash);
          dispatch(closeCreateInviteCodeDialog());
        }}>
          Copy and Play
        </Button>
      </DialogActions>
    </DialogContent>
  );
}

export default CreateInviteCodeDialog;
