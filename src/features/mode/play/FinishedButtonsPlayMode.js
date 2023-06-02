import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import Wording from "common/Wording.js";
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const FinishedButtonsPlayMode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.playMode.active) {
    if (state.playMode.accepted) {
      if (
        state.board.isMate ||
        state.board.isStalemate ||
        state.playMode.draw === Wording.verb.ACCEPT.toLowerCase() ||
        state.playMode.resign === Wording.verb.ACCEPT.toLowerCase() ||
        state.playMode.timeOut
      ) {
        return (
          <ButtonGroup
            sx={{ mt: 1.5 }}
            orientation="vertical"
            size="small"
            aria-label="Game Over"
            fullWidth={true}
          >
            <Button onClick={() => {
              Ws.rematch(Wording.verb.PROPOSE.toLowerCase());
              dispatch(playMode.proposeRematch());
            }}>
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
