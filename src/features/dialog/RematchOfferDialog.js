import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Wording from "../../common/Wording.js";
import { closeRematchOfferDialog } from '../../features/dialog/rematchOfferDialogSlice';
import { proposeRematch } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const RematchOfferDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchOffer = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.PROPOSE.toLowerCase()).then((data) => {
      dispatch(proposeRematch());
      dispatch(closeRematchOfferDialog());
    });
  };

  return (
    <Dialog open={state.rematchOfferDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Offer rematch</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(closeRematchOfferDialog())}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RematchOfferDialog;
