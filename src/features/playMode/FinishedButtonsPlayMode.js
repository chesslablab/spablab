import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Wording from "../../common/Wording.js";
import { openOfferRematchDialog } from '../../features/dialog/offerRematchDialogSlice';
import { MODE_PLAY } from '../../features/modeConstants';

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: 15,
  },
});

const FinishedButtonsPlayMode = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.mode.name === MODE_PLAY) {
    if (state.mode.play.accepted) {
      if (
        state.board.isMate ||
        state.mode.play.draw === Wording.verb.ACCEPT.toLowerCase() ||
        state.mode.play.resign === Wording.verb.ACCEPT.toLowerCase() ||
        state.mode.play.timer.over
      ) {
        return (
          <ButtonGroup
            className={classes.buttonGroup}
            orientation="vertical"
            size="small"
            aria-label="Game Over"
            fullWidth={true}
          >
            <Button onClick={() => dispatch(openOfferRematchDialog())}>
              Offer Rematch
            </Button>
          </ButtonGroup>
        );
      }
    }
  }

  return null;
}

export default FinishedButtonsPlayMode;
