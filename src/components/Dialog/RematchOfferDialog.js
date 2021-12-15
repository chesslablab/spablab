import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Wording from "../../utils/Wording.js";
import { useDispatch, useSelector } from "react-redux";
// TODO
// import { wsMssgRematch } from "../../actions/serverActions";
import rematchOfferDialogActionTypes from "../../constants/rematchOfferDialogActionTypes";
import modeActionTypes from "../../constants/modeActionTypes";

const RematchOfferDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchOffer = (event) => {
    event.preventDefault();
    // TODO
    // wsMssgRematch(state, Wording.verb.PROPOSE.toLowerCase()).then((data) => {
    //  dispatch({ type: modeActionTypes.REMATCH_PROPOSE });
    //  dispatch({ type: rematchOfferDialogActionTypes.CLOSE });
    // });
    console.log('TODO');
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
