import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { close as closeEnterCodeDialog } from "../actions/enterCodeDialogActions";
import { startBoard } from '../actions/boardActions';
import { accept, quit } from '../actions/serverActions';

const EnterCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    if (!state.createInvitationDialog.code) {
      quit(state).then(() => {
        accept(state, event.target.elements.code.value).then(() => {
          dispatch(closeEnterCodeDialog());
          dispatch(startBoard({ back: state.board.history.length - 1 }));
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
              name="code"
              label="Code"
              variant="outlined"
            />
          </Grid>
          <DialogActions>
            <Button type="submit">
              Play
            </Button>
            <Button
              onClick={() => dispatch(closeEnterCodeDialog())} color="primary"
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
