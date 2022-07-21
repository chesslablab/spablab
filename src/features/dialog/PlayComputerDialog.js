import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import Pgn from '../../common/Pgn';
import { closePlayComputerDialog } from '../../features/dialog/playComputerDialogSlice';
import { setStockfish } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const PlayComputerDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const configure = (level) => {
    let settings = {
      options: {
        "Skill Level": 11
      },
      params: {
        "depth": 4
      }
    };
    if (level === "0") {
      settings.options["Skill Level"] = 6;
      settings.params["depth"] = 2;
    } else if (level === "2") {
      settings.options["Skill Level"] = 17;
      settings.params["depth"] = 8;
    } else if (level === "3") {
      settings.options["Skill Level"] = 20;
      settings.params["depth"] = 12;
    }

    return settings;
  }

  const handlePlay = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    const payload = configure(event.target.elements.level.value);
    dispatch(setStockfish(payload));
    dispatch(closePlayComputerDialog());
    if (Pgn.symbol.WHITE === color) {
      WsAction.quit(state).then(() => WsAction.startStockfish(state, color));
    } else {
      WsAction.quit(state).then(() =>
        WsAction.startStockfish(state, color).then(() =>
          WsAction.stockfish(state)));
    }
  }

  return (
    <Dialog open={state.playComputerDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Play computer</DialogTitle>
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
            <MenuItem key="rand" value="rand">
              Random
            </MenuItem>
            <MenuItem key="w" value={Pgn.symbol.WHITE}>
              White
            </MenuItem>
            <MenuItem key="b" value={Pgn.symbol.BLACK}>
              Black
            </MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            name="level"
            label="Level"
            defaultValue="1"
            margin="normal"
          >
            <MenuItem key="beginner" value="0">
              Beginner
            </MenuItem>
            <MenuItem key="intermediate" value="1">
              Intermediate
            </MenuItem>
            <MenuItem key="advanced" value="2">
              Advanced
            </MenuItem>
            <MenuItem key="expert" value="3">
              Expert
            </MenuItem>
          </TextField>
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(closePlayComputerDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlayComputerDialog;
