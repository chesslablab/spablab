import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import HeuristicPicture from './HeuristicPicture.js';
import { useDispatch, useSelector } from "react-redux";
import heuristicPictureDialogActions from '../constants/heuristicPictureDialogActionTypes';

const HeuristicPictureDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.heuristicPictureDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>Heuristic picture</DialogTitle>
      <DialogContent>
        <Alert className="info-alert" severity="info" style={{marginBottom:20}}>
          +1 is the best possible evaluation for White and -1 the best possible evaluation for Black.
          Both forces being set to 0.5 means they're actually offset and, therefore, balanced.
        </Alert>
        <HeuristicPicture />
        <DialogActions>
          <Button onClick={() => dispatch({ type: heuristicPictureDialogActions.CLOSE })}>
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default HeuristicPictureDialog;
