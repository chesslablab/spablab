import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { closeTakebackOfferDialog } from '../../features/dialog/offerTakebackDialogSlice';
import { proposeTakeback } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const OfferTakebackDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackOffer = (event) => {
    event.preventDefault();
    WsAction.takeback(state, Wording.verb.PROPOSE.toLowerCase());
    dispatch(proposeTakeback());
    dispatch(closeTakebackOfferDialog());
  };

  return (
    <Dialog
      open={state.offerTakebackDialog.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>Propose a tackeback</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(closeTakebackOfferDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferTakebackDialog;
