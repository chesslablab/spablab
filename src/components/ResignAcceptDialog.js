import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { wsMssgResign } from '../actions/serverActions';
import resignAcceptDialogActionTypes from '../constants/resignAcceptDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import Wording from '../utils/Wording.js';

const ResignAcceptDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleResignAccept = (event) => {
    event.preventDefault();
    const verb = Wording.extract(modeActionTypes.RESIGN_ACCEPT, Wording.verb.ACCEPT);
    wsMssgResign(state, verb.toLowerCase()).then((data) => {
      dispatch({ type: modeActionTypes.RESIGN_ACCEPT });
      dispatch({ type: resignAcceptDialogActionTypes.CLOSE });
    });
  }

  return (
    <Dialog open={state.resignAcceptDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Resign</DialogTitle>
      <DialogContent>
        <form onSubmit={handleResignAccept}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: resignAcceptDialogActionTypes.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ResignAcceptDialog;
