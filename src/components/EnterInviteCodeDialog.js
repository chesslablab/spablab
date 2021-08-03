import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import enterInviteCodeDialogActions from '../constants/enterInviteCodeDialogActionTypes';
import { startBoard } from '../actions/boardActions';
import { wsMssgAccept, wsMssgQuit } from '../actions/serverActions';

const EnterInviteCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    if (!state.mode.playfriend.color) {
      wsMssgQuit(state).then(() => {
        wsMssgAccept(state, event.target.elements.hash.value).then(() => {
          dispatch(startBoard({ back: state.board.history.length - 1 }));
          dispatch({ type: enterInviteCodeDialogActions.CLOSE });
        });
      });
    }
  }

  return (
    <Dialog open={state.enterCodeDialog.open}>
      <DialogTitle>Enter invite code</DialogTitle>
      <DialogContent>
        <form onSubmit={handlePlay}>
          <Grid container spacing={3}>
            <TextField
              name="hash"
              label="Code"
            />
          </Grid>
          <DialogActions>
            <Button type="submit">
              Play
            </Button>
            <Button
              onClick={() => dispatch({ type: enterInviteCodeDialogActions.CLOSE })} color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EnterInviteCodeDialog;
