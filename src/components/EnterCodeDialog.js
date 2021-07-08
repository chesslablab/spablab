import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import enterCodeDialogActions from '../constants/enterCodeDialogActionTypes';
import { startBoard } from '../actions/boardActions';
import { wsMssgAccept, wsMssgQuit } from '../actions/serverActions';

const EnterCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    if (!state.mode.playfriend.created_code) {
      wsMssgQuit(state).then(() => {
        wsMssgAccept(state, event.target.elements.hash.value).then(() => {
          dispatch(startBoard({ back: state.board.history.length - 1 }));
          dispatch({ type: enterCodeDialogActions.CLOSE });
        });
      });
    }
  }

  return (
    <Dialog open={state.enterCodeDialog.open}>
      <DialogTitle>Enter code</DialogTitle>
      <DialogContent id="invite-friend-dialog">
        <form onSubmit={handlePlay}>
          <Grid container spacing={3}>
            <TextField
              name="hash"
              label="Code"
              variant="outlined"
            />
          </Grid>
          <DialogActions>
            <Button type="submit">
              Play
            </Button>
            <Button
              onClick={() => dispatch({ type: enterCodeDialogActions.CLOSE })} color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EnterCodeDialog;
