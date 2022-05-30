import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import rematchOfferDialogActionTypes from "../../constants/dialog/rematchOfferDialogActionTypes";
import modeActionTypes from "../../constants/modeActionTypes";
import Wording from "../../utils/Wording.js";
import WsAction from '../../ws/WsAction';

const RematchOfferDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchOffer = (event) => {
    event.preventDefault();
    WsAction.rematch(state, Wording.verb.PROPOSE.toLowerCase()).then((data) => {
      dispatch({ type: modeActionTypes.PLAY_REMATCH_PROPOSE });
      dispatch({ type: rematchOfferDialogActionTypes.CLOSE });
    });
  };

  return (
    <Dialog open={state.rematchOfferDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Offer rematch</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchOffer}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button
              onClick={() =>
                dispatch({ type: rematchOfferDialogActionTypes.CLOSE })
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

export default RematchOfferDialog;
