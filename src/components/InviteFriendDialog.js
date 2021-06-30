import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, MenuItem, TextField, Typography, Select } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { createCode, close as closeInviteFriendDialog } from "../actions/inviteFriendDialogActions";
import { startBoard } from '../actions/boardActions';
import { playfriend, quit } from '../actions/serverActions';
import Pgn from '../utils/Pgn';

const InviteFriendDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const randColor = () => {
    return Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
  }

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color = event.target.elements.color.value;
    if (color === 'rand') {
      color = randColor();
    }
    dispatch(quit(state.server.ws)).then(() => {
      dispatch(playfriend(state.server.ws, color, event.target.elements.time.value)).then((data) => {
        const code = JSON.parse(data).id;
        dispatch(createCode({
          color: color,
          time: event.target.elements.time.value,
          code: code
        }));
      });
    });
  }

  const handlePlay = (event) => {
    event.preventDefault();
    console.log('TODO');
    // TODO ...
    dispatch(closeInviteFriendDialog());
    dispatch(startBoard({ back: state.board.history.length - 1 }));
  }

  return (
    <div>
      <Dialog open={state.inviteFriendDialog.open}>
        <DialogTitle>Invite a friend</DialogTitle>
        <DialogContent id="invite-friend-dialog">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <form onSubmit={handleCreateCode}>
                <Typography variant="body1" gutterBottom>
                  Create a new code and share it with a friend.
                </Typography>
                <TextField
                  select
                  fullWidth
                  name="color"
                  label="Color"
                  variant="outlined"
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
                  variant="outlined"
                  defaultValue={10}
                  inputProps={{ min: "1", max: "60", step: "1" }}
                />
                <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button type="submit">
                    Create code
                  </Button>
                </ButtonGroup>
              </form>
            </Grid>

            <Grid item xs={6}>
              <form onSubmit={handlePlay}>
                <Typography variant="body1" gutterBottom>
                  Or paste the code if you've got one, and play chess now.
                </Typography>
                <TextField
                  label="Code"
                  variant="outlined"
                  defaultValue={state.inviteFriendDialog.code}
                />
                <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button type="submit">
                    Play
                  </Button>
                </ButtonGroup>
              </form>
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
