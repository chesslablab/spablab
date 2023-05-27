import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Wording from "common/Wording.js";
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const OfferRematchDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchOffer = (event) => {
    event.preventDefault();
    Ws.rematch(Wording.verb.PROPOSE.toLowerCase());
    dispatch(playMode.proposeRematch());
    dispatch(playMode.offerRematchDialog({ open: false }));
  };

  return (
    <Dialog open={state.playMode.dialogs.offerRematch.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Offer rematch</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(playMode.offerRematchDialog({ open: false }))}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferRematchDialog;
