import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { wsMssgQuit, wsMssgResponse, wsMssgStartGrandmaster } from '../../actions/serverActions';
import playLikeGrandmasterDialogActions from '../../constants/playLikeGrandmasterDialogActionTypes';
import Pgn from '../../utils/Pgn';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const PlayLikeGrandmasterDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    if (Pgn.symbol.WHITE === color) {
        wsMssgQuit(state).then(() => {
          wsMssgStartGrandmaster(state, color).then(() => {
            dispatch({ type: playLikeGrandmasterDialogActions.CLOSE });
          });
        });
    } else {
      wsMssgQuit(state).then(() => {
        wsMssgStartGrandmaster(state, color).then(() => {
          wsMssgResponse(state).then(() => {
            dispatch({ type: playLikeGrandmasterDialogActions.CLOSE });
          });
        });
      });
    }
  }

  return (
    <Dialog open={state.playLikeGrandmasterDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Play like a grandmaster</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleCreateCode}>
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
            <Button onClick={() => dispatch({ type: playLikeGrandmasterDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlayLikeGrandmasterDialog;
