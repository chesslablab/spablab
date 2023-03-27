import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import * as offerDrawDialog from '../../features/dialog/offerDrawDialogSlice';
import * as mode from '../../features/mode/modeSlice';
import WsAction from '../../features/ws/WsAction';

const OfferDrawDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawOffer = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.PROPOSE.toLowerCase());
    dispatch(mode.proposeDraw());
    dispatch(offerDrawDialog.close());
  };

  return (
    <Dialog open={state.offerDrawDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Offer draw</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(offerDrawDialog.close())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDrawDialog;
