import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pgn from '../../common/Pgn';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import PlayOnlineTable from '../../features/table/PlayOnlineTable';
import { closePlayOnlineDialog } from '../../features/dialog/playOnlineDialogSlice';
import { setPlayOnline } from '../../features/mainButtonsSlice';
import WsAction from '../../ws/WsAction';

const PlayOnlineDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleCreateCode = (event) => {
    event.preventDefault();
    const settings = {
      color: event.target.elements.color.value === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : event.target.elements.color.value,
      min: event.target.elements.min.value,
      increment: event.target.elements.increment.value,
      submode: 'online'
    };
    WsAction.quit(state).then(() => {
      WsAction.startPlay(state, settings).then(() => {
        dispatch(closePlayOnlineDialog());
        dispatch(setPlayOnline());
      });
    });
  }

  return (
    <Dialog open={state.playOnlineDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Play online</DialogTitle>
      <DialogContent>
        <form onSubmit={handleCreateCode}>
          <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
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
              </Grid>
              <Grid item xs={12} md={4}>
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
              </Grid>
              <Grid item xs={12} md={4}>
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
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit">
                Create Game
              </Button>
              <Button onClick={() => dispatch(closePlayOnlineDialog())}>
                Cancel
              </Button>
            </DialogActions>
          </Paper>
        </form>
        <PlayOnlineTable />
      </DialogContent>
    </Dialog>
  );
};

export default PlayOnlineDialog;
