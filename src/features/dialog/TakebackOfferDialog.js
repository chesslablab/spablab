import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import modeActionTypes from '../../constants/modeActionTypes';
import { takebackOfferDialogClose } from '../../features/dialog/takebackOfferDialogSlice';
import Wording from '../../utils/Wording.js';
import WsAction from '../../ws/WsAction';

const TakebackOfferDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackOffer = (event) => {
    event.preventDefault();
    WsAction.takeback(state, Wording.verb.PROPOSE.toLowerCase()).then((data) => {
      dispatch({ type: modeActionTypes.PLAY_TAKEBACK_PROPOSE });
      dispatch(takebackOfferDialogClose());
    });
  };

  return (
    <Dialog
      open={state.takebackOfferDialog.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>Propose a tackeback</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(takebackOfferDialogClose())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TakebackOfferDialog;
