import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { drawOfferDialogClose } from '../../features/dialog/drawOfferDialogSlice';
import { modePlayDrawPropose } from '../features/modeSlice';
import Wording from '../../utils/Wording.js';
import WsAction from '../../ws/WsAction';

const DrawOfferDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawOffer = (event) => {
    event.preventDefault();
    WsAction.draw(state, Wording.verb.PROPOSE.toLowerCase()).then((data) => {
      dispatch(modePlayDrawPropose());
      dispatch(drawOfferDialogClose());
    });
  };

  return (
    <Dialog open={state.drawOfferDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Offer draw</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button
              onClick={() =>
                dispatch(drawOfferDialogClose())
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

export default DrawOfferDialog;
