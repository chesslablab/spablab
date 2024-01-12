import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Wording from 'common/Wording';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const StartedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const disabled = stateBoard.isMate ||
    stateBoard.isStalemate ||
    statePlayMode.draw === Wording.verb.ACCEPT.toLowerCase() ||
    statePlayMode.takeback === Wording.verb.PROPOSE.toLowerCase() ||
    statePlayMode.resign === Wording.verb.ACCEPT.toLowerCase() ||
    statePlayMode.leave ||
    statePlayMode.timeOut;

  if (statePlayMode.accepted) {
    return (
      <ButtonGroup
        sx={{ mt: 1.5 }}
        size="small"
        variant="text"
        aria-label="Game Buttons"
        orientation="vertical"
        fullWidth={true}
        disabled={disabled}
      >
        <Button
          onClick={() => {
            dispatch(infoAlert.show({
              mssg: 'Waiting for the opponent to accept or decline.'
            }));
            dispatch(playMode.proposeTakeback());
            Ws.takeback(Wording.verb.PROPOSE.toLowerCase());
          }}
        >
          Propose a takeback
        </Button>
        <Button
          onClick={() => {
            dispatch(infoAlert.show({
              mssg: 'Waiting for the opponent to accept or decline.'
            }));
            dispatch(playMode.proposeDraw());
            Ws.draw(Wording.verb.PROPOSE.toLowerCase());
          }}
        >
          Offer draw
        </Button>
        <Button
          onClick={() => {
            Ws.resign(Wording.verb.ACCEPT.toLowerCase());
            dispatch(playMode.acceptResign());
          }}
        >
          Resign
        </Button>
      </ButtonGroup>
    );
  }

  return null;
}

export default StartedButtons;
