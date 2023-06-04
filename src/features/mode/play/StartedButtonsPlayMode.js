import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Wording from 'common/Wording';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const StartedButtonsPlayMode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const disabled = state.board.isMate ||
    state.board.isStalemate ||
    state.playMode.draw ||
    state.playMode.takeback === Wording.verb.PROPOSE.toLowerCase() ||
    state.playMode.resign ||
    state.playMode.leave ||
    state.playMode.timeOut;

  if (state.playMode.active) {
    if (state.playMode.accepted) {
      return (
        <ButtonGroup
          sx={{ mt: 1.5 }}
          size="small"
          aria-label="Game Buttons"
          orientation="vertical"
          fullWidth={true}
          disabled={disabled}
        >
          <Button onClick={() => {
            Ws.takeback(Wording.verb.PROPOSE.toLowerCase());
            dispatch(playMode.proposeTakeback());
          }}>
            Propose a takeback
          </Button>
          <Button onClick={() => {
            dispatch(infoAlert.show({
              mssg: 'Waiting for the opponent to accept or decline.'
            }));
            dispatch(playMode.proposeDraw());
            Ws.draw(Wording.verb.PROPOSE.toLowerCase());
          }}>
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

  return null;
}

export default StartedButtonsPlayMode;
