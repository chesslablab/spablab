import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import drawAcceptDialogActionTypes from '../constants/drawAcceptDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import { wsMssgDraw } from '../actions/serverActions';

const DrawAcceptDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleDrawAccept = (event) => {
    event.preventDefault();
    wsMssgDraw(state, 'accept').then((data) => {
      dispatch({ type: drawAcceptDialogActionTypes.CLOSE });
    });
  }

  const handleDrawDecline = (event) => {
    event.preventDefault();
    wsMssgDraw(state, 'decline').then(() => {
      dispatch({ type: drawAcceptDialogActionTypes.CLOSE });
    });
  }

  return (
    <Dialog open={state.drawAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>A draw is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawAccept}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: drawAcceptDialogActionTypes.CLOSE })}>
              Decline
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DrawAcceptDialog;
