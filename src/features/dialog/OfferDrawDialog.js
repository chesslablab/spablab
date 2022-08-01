import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { closeDrawOfferDialog } from '../../features/dialog/offerDrawDialogSlice';
import { proposeDraw } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const OfferDrawDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawOffer = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.PROPOSE.toLowerCase());
    dispatch(proposeDraw());
    dispatch(closeDrawOfferDialog());
  };

  return (
    <Dialog open={state.offerDrawDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Offer draw</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button
              onClick={() =>
                dispatch(closeDrawOfferDialog())
              }
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDrawDialog;
