import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close as closeInviteFriendDialog } from "../actions/inviteFriendDialogActions";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Select } from '@material-ui/core';

const InviteFriendDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('TODO');
  }

  return (
    <div>
      <Dialog open={state.inviteFriendDialog.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite a friend</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <InputLabel>Soon available! Please be patient.</InputLabel>
            <DialogActions>
              <Button color="primary" type="submit">
                Play
              </Button>
              <Button onClick={() => dispatch(closeInviteFriendDialog())} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InviteFriendDialog;
