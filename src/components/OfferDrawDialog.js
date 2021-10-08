import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import offerDrawDialogActions from '../constants/offerDrawDialogActionTypes';
import { wsMssgAccept, wsMssgQuit } from '../actions/serverActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const OfferDrawDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOfferDraw = (event) => {
    event.preventDefault();
    // TODO
    console.log('TODO');
    dispatch({ type: offerDrawDialogActions.OPEN });
  }

  return (
    <Dialog open={state.offerDrawDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Offer draw</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleOfferDraw}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: offerDrawDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default OfferDrawDialog;
