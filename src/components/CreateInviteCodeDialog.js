import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import alertActionTypes from '../constants/alertActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import createInviteCodeDialogActions from '../constants/createInviteCodeDialogActionTypes';
import { wsMssgStartPlayfriend, wsMssgStartAnalysis, wsMssgQuit } from '../actions/serverActions';
import { makeStyles } from '@material-ui/core/styles';
import Pgn from '../utils/Pgn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const randColor = () => {
    return Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
  }

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color = event.target.elements.color.value;
    let time = event.target.elements.time.value;
    if (color === 'rand') {
      color = randColor();
    }
    wsMssgQuit(state).then(() => wsMssgStartPlayfriend(state, color, time));
  }

  return (
    <Dialog open={state.createInvitationDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Create invite code</DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleCreateCode}>
          <TextField
            select
            fullWidth
            name="color"
            label="Color"
            defaultValue="rand"
          >
            <MenuItem key={0} value="rand">
              Random
            </MenuItem>
            <MenuItem key={1} value={Pgn.symbol.WHITE}>
              White
            </MenuItem>
            <MenuItem key={2} value={Pgn.symbol.BLACK}>
              Black
            </MenuItem>
          </TextField>
          <TextField
            fullWidth
            type="number"
            name="time"
            label="Minutes"
            defaultValue={10}
            inputProps={{ min: "1", max: "60", step: "1" }}
          />
          {
            state.mode.playfriend.hash
              ?  <TextField
                    fullWidth
                    type="text"
                    name="sharecode"
                    label="Share code with friend"
                    value={state.mode.playfriend.hash}
                  />
              : null
          }
          <DialogActions>
            {
              !state.mode.playfriend.hash
                ? <div>
                    <Button type="submit">Create code</Button>
                    <Button onClick={() => {
                      wsMssgQuit(state).then(() => {
                        wsMssgStartAnalysis(state.server.ws).then(() => {
                          dispatch({ type: createInviteCodeDialogActions.CLOSE });
                        });
                      });
                    }}>
                      Cancel
                    </Button>
                  </div>
                : <Button onClick={() => {
                    dispatch({ type: createInviteCodeDialogActions.CLOSE });
                    dispatch({
                      type: alertActionTypes.INFO_DISPLAY,
                      payload: {
                        info: 'Waiting for friend to accept invitation...'
                      }
                    });
                }}>Play</Button>
            }
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInviteCodeDialog;
