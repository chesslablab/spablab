import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Pgn from '../../common/Pgn';
import { closePlayGrandmasterDialog } from '../../features/dialog/playGmDialogSlice';
import WsAction from '../../ws/WsAction';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const PlayGmDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    dispatch(closePlayGrandmasterDialog());
    if (Pgn.symbol.WHITE === color) {
      WsAction.quit(state).then(() => WsAction.startGrandmaster(state, color));
    } else {
      WsAction.quit(state).then(() =>
        WsAction.startGrandmaster(state, color).then(() =>
          WsAction.gm(state)));
    }
  }

  return (
    <Dialog open={state.playGmDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Guess the move</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handlePlay}>
          <TextField
            select
            fullWidth
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
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch(closePlayGrandmasterDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlayGmDialog;
