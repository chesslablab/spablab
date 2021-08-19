import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
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
