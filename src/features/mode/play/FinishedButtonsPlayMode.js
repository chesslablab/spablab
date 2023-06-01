import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import * as playMode from 'features/mode/playModeSlice';
import Wording from "common/Wording.js";

const FinishedButtonsPlayMode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.playMode.active) {
    if (state.playMode.play.accepted) {
      if (
        state.board.isMate ||
        state.board.isStalemate ||
        state.playMode.play.draw === Wording.verb.ACCEPT.toLowerCase() ||
        state.playMode.play.resign === Wording.verb.ACCEPT.toLowerCase() ||
        state.playMode.play.timeOut
      ) {
        return (
          <ButtonGroup
            sx={{ mt: 1.5 }}
            orientation="vertical"
            size="small"
            aria-label="Game Over"
            fullWidth={true}
          >
            <Button onClick={() => dispatch(playMode.offerRematchDialog({ open: true }))}>
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
