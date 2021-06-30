import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem,
  TextField, Select } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { close as closeInviteFriendDialog } from "../actions/inviteFriendDialogActions";
import { startBoard } from '../actions/boardActions';
import { playfriend, quit } from '../actions/serverActions';
import Pgn from '../utils/Pgn';

const InviteFriendDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const inviteFriendDialogInitialState = {
    color: "rand",
    time: 10
  };

  const [inviteFriendDialogState, setInviteFriendDialogInitialState] = useState(inviteFriendDialogInitialState);

  const randColor = () => {
    return Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
  }

  const handleChange = (event) => {
    setInviteFriendDialogInitialState({
      ...inviteFriendDialogState,
      [event.target.name]: event.target.value
    });
  }

  const handleCreateCode = () => {
    let color = inviteFriendDialogState.color;
    if (color === "rand") {
      color = randColor();
    }
    dispatch(quit(state.server.ws)).then(() => {
      dispatch(playfriend(state.server.ws, color, inviteFriendDialogState.time)).then(() => {
        setInviteFriendDialogInitialState(inviteFriendDialogInitialState);
        dispatch(closeInviteFriendDialog());
        dispatch(startBoard({ back: state.board.history.length - 1 }));
      });
    });
  }

  const handlePlay = () => {
    console.log('TODO');
  }

  return (
    <div>
      <Dialog open={state.inviteFriendDialog.open}>
        <DialogTitle id="form-dialog-title">Invite a friend</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                name="color"
                label="Color"
                variant="outlined"
                defaultValue="rand"
                onChange={handleChange}
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
                variant="outlined"
                defaultValue={10}
                inputProps={{ min: "1", max: "60", step: "1" }}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCreateCode()}
              >
                Create code
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Code"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePlay()}
              >
                Play
              </Button>
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              onClick={() => dispatch(closeInviteFriendDialog())} color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InviteFriendDialog;
