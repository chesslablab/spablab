import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Wording from 'common/Wording';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const StartedButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const disabled = state.board.isMate ||
    state.board.isStalemate ||
    state.playMode.draw === Wording.verb.ACCEPT.toLowerCase() ||
    state.playMode.takeback === Wording.verb.PROPOSE.toLowerCase() ||
    state.playMode.resign === Wording.verb.ACCEPT.toLowerCase() ||
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
            dispatch(infoAlert.show({
              mssg: 'Waiting for the opponent to accept or decline.'
            }));
            dispatch(playMode.proposeTakeback());
            Ws.takeback(Wording.verb.PROPOSE.toLowerCase());
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

export default StartedButtons;
