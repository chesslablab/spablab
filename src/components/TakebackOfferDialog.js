import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { wsMssgTakeback } from '../actions/serverActions';
import takebackOfferDialogActionTypes from '../constants/takebackAcceptDialogActionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const TakebackOfferDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleTakebackOffer = (event) => {
    event.preventDefault();
    wsMssgTakeback(state, 'propose').then((data) => {
      dispatch({ type: modeActionTypes.TAKEBACK_PROPOSE });
      dispatch({ type: takebackOfferDialogActionTypes.CLOSE });
    });
  }

  return (
    <Dialog open={state.takebackOfferDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Request a takeback</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleTakebackOffer}>
          <DialogActions>
            <Button type="submit">
              Accept
            </Button>
            <Button onClick={() => dispatch({ type: takebackOfferDialogActionTypes.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TakebackOfferDialog;
