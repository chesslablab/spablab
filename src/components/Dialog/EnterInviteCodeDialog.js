import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { wsMssgAccept, wsMssgQuit } from "../../actions/serverActions";
import enterInviteCodeDialogActions from "../../constants/enterInviteCodeDialogActionTypes";

const EnterInviteCodeDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePlay = (event) => {
    event.preventDefault();
    wsMssgQuit(state).then(() => {
      wsMssgAccept(state, event.target.elements.hash.value).then(() => {
        dispatch({ type: enterInviteCodeDialogActions.CLOSE });
      });
    });
  };

  return (
    <Dialog open={state.enterInviteCodeDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <form onSubmit={handlePlay}>
          <TextField fullWidth required name="hash" label="Invite code" />
          <DialogActions>
            <Button type="submit">Play</Button>
            <Button onClick={() => dispatch({ type: enterInviteCodeDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnterInviteCodeDialog;
