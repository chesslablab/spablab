import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Wording from "../../common/Wording.js";
import * as offerRematchDialog from '../../features/dialog/offerRematchDialogSlice';
import * as mode from '../../features/mode/modeSlice';
import WsAction from '../../features/ws/WsAction';

const OfferRematchDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchOffer = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.PROPOSE.toLowerCase());
    dispatch(mode.proposeRematch());
    dispatch(offerRematchDialog.close());
  };

  return (
    <Dialog open={state.offerRematchDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Offer rematch</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(offerRematchDialog.close())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferRematchDialog;
