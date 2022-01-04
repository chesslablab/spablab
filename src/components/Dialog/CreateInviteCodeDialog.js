import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@mui/material/styles';
import { wsMssgQuit, wsMssgStartPlayfriend } from '../../actions/serverActions';
import createInviteCodeDialogActions from '../../constants/createInviteCodeDialogActionTypes';
import Pgn from '../../utils/Pgn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    let time = event.target.elements.time.value;
    let increment = event.target.elements.increment.value;
    wsMssgQuit(state).then(() => wsMssgStartPlayfriend(state, color, time, increment));
  }

  return (
    <Dialog open={state.createInviteCodeDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Create invite code</DialogTitle>
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
          <TextField
            fullWidth
            type="number"
            name="time"
            label="Minutes"
            defaultValue={10}
            inputProps={{ min: "1", max: "60", step: "1" }}
          />
          <TextField
            fullWidth
            type="number"
            name="increment"
            label="Increment in seconds"
            defaultValue={0}
            inputProps={{ min: "0", max: "60", step: "1" }}
          />
          {
            state.mode.playfriend.hash
              ?  <TextField
                    fullWidth
                    type="text"
                    name="sharecode"
                    label="Share this code with a friend"
                    value={state.mode.playfriend.hash}
                  />
              : null
          }
          <DialogActions>
            {
              !state.mode.playfriend.hash
                ? <div>
                    <Button type="submit">Create code</Button>
                    <Button onClick={() => dispatch({ type: createInviteCodeDialogActions.CLOSE })}>Cancel</Button>
                  </div>
                : <Button onClick={() => dispatch({ type: createInviteCodeDialogActions.CLOSE })}>Play</Button>
            }
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInviteCodeDialog;
