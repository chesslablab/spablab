import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import WsAction from 'features/ws/WsAction';

const OfferTakebackDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackOffer = (event) => {
    event.preventDefault();
    WsAction.takeback(Wording.verb.PROPOSE.toLowerCase());
    dispatch(playMode.proposeTakeback());
    dispatch(playMode.offerTakebackDialog({ open: false }));
  };

  return (
    <Dialog
      open={state.offerTakebackDialog.open}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>Propose a tackeback</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(playMode.offerTakebackDialog({ open: false }))}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferTakebackDialog;
