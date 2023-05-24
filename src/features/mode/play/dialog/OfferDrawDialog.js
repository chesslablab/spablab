import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import WsAction from 'features/ws/WsAction';

const OfferDrawDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawOffer = (event) => {
    event.preventDefault();
    WsAction.draw(Wording.verb.PROPOSE.toLowerCase());
    dispatch(playMode.proposeDraw());
    dispatch(playMode.offerDrawDialog({ open: false }));
  };

  return (
    <Dialog open={state.playMode.dialogs.offerDraw.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Offer draw</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(playMode.offerDrawDialog({ open: false }))}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDrawDialog;
