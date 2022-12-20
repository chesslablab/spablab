import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import * as modeConst from '../../../features/mode/modeConst';
import Wording from "../../../common/Wording.js";
import * as offerRematchDialog from '../../../features/dialog/offerRematchDialogSlice';

const FinishedButtonsPlayMode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.mode.name === modeConst.PLAY) {
    if (state.mode.play.accepted) {
      if (
        state.board.isMate ||
        state.mode.play.draw === Wording.verb.ACCEPT.toLowerCase() ||
        state.mode.play.resign === Wording.verb.ACCEPT.toLowerCase() ||
        state.mode.play.timer.over
      ) {
        return (
          <ButtonGroup
            sx={{ mt: 1.5 }}
            orientation="vertical"
            size="small"
            aria-label="Game Over"
            fullWidth={true}
          >
            <Button onClick={() => dispatch(offerRematchDialog.open())}>
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
