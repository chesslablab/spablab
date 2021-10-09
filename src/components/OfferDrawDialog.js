import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import offerDrawDialogActionTypes from '../constants/offerDrawDialogActionTypes';
import { wsMssgDraw } from '../actions/serverActions';

const OfferDrawDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleOfferDraw = (event) => {
    event.preventDefault();
    wsMssgDraw(state, 'propose').then((data) => {
      dispatch({ type: offerDrawDialogActionTypes.CLOSE });
    });
  }

  return (
    <Dialog open={state.offerDrawDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Offer draw</DialogTitle>
      <DialogContent>
        <form onSubmit={handleOfferDraw}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: offerDrawDialogActionTypes.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default OfferDrawDialog;
