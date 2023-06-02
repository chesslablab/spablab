import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Wording from 'common/Wording';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const StartedButtonsPlayMode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.playMode.active) {
    if (state.playMode.accepted) {
      if (
        !state.board.isMate &&
        !state.board.isStalemate &&
        !state.playMode.draw &&
        !state.playMode.resign &&
        !state.playMode.leave &&
        !state.playMode.timeOut
      ) {
        return (
          <ButtonGroup
            sx={{ mt: 1.5 }}
            size="small"
            aria-label="Game Buttons"
            orientation="vertical"
            fullWidth={true}
          >
            <Button
                disabled={!state.board.movetext}
                onClick={() => dispatch(playMode.offerTakebackDialog({ open: true }))}
            >
              Propose a takeback
            </Button>
            <Button onClick={() => dispatch(playMode.offerDrawDialog({ open: true }))}>
              Offer draw
            </Button>
            <Button onClick={() => {
              Ws.resign(Wording.verb.ACCEPT.toLowerCase());
              dispatch(playMode.acceptResign());
            }}>
              Resign
            </Button>
          </ButtonGroup>
        );
      }
    }
  }

  return null;
}

export default StartedButtonsPlayMode;
