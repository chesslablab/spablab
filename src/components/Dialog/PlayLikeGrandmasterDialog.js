import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import alertActionTypes from '../../constants/alertActionTypes';
import modeActionTypes from '../../constants/modeActionTypes';
import playLikeGrandmasterDialogActions from '../../constants/playLikeGrandmasterDialogActionTypes';
import { wsMssgQuit, wsMssgStartGrandmaster } from '../../actions/serverActions';
import { makeStyles } from '@material-ui/core/styles';
import Pgn from '../../utils/Pgn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const PlayLikeGrandmasterDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color = event.target.elements.color.value;
    wsMssgQuit(state).then(() => {
      // TODO: Add color paramenter
      // wsMssgStartGrandmaster(state.server.ws, color),
      wsMssgStartGrandmaster(state.server.ws);
      dispatch({ type: playLikeGrandmasterDialogActions.CLOSE });
    });
  }

  return (
    <Dialog open={state.playLikeGrandmasterDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Play like a grandmaster</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleCreateCode}>
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
