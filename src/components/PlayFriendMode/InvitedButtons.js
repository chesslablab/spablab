import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import drawOfferDialogActionTypes from '../../constants/dialog/drawOfferDialogActionTypes';
import resignAcceptDialogActionTypes from '../../constants/dialog/resignAcceptDialogActionTypes';
import takebackOfferDialogActionTypes from '../../constants/dialog/takebackOfferDialogActionTypes';

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: 15,
  },
});

const InvitedButtons = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.mode.play.accepted) {
    if (!state.board.isMate &&
      !state.mode.play.draw &&
      !state.mode.play.resign &&
      !state.mode.play.timer.over
    ) {
      return (
        <ButtonGroup
          className={classes.buttonGroup}
          size="small"
          aria-label="Game Buttons"
          orientation="vertical"
          fullWidth={true}
        >
          <Button onClick={() => dispatch({ type: takebackOfferDialogActionTypes.OPEN })}>
            Propose a takeback
          </Button>
          <Button onClick={() => dispatch({ type: drawOfferDialogActionTypes.OPEN })}>
            Offer draw
          </Button>
          <Button onClick={() => dispatch({ type: resignAcceptDialogActionTypes.OPEN })}>
            Resign
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default InvitedButtons;
