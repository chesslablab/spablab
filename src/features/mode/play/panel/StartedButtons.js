import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as actionConst from 'features/mode/actionConst';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'socket/Ws';

const StartedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const disabled = stateBoard.isMate ||
    stateBoard.isStalemate ||
    statePlayMode.draw === actionConst.ACCEPT ||
    statePlayMode.takeback === actionConst.PROPOSE ||
    statePlayMode.resign === actionConst.ACCEPT ||
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
              msg: 'Waiting for the opponent to accept or decline.'
            }));
            dispatch(playMode.proposeTakeback());
            Ws.takeback(actionConst.PROPOSE);
          }}
        >
          Propose a takeback
        </Button>
        <Button
          onClick={() => {
            dispatch(infoAlert.show({
              msg: 'Waiting for the opponent to accept or decline.'
            }));
            dispatch(playMode.proposeDraw());
            Ws.draw(actionConst.PROPOSE);
          }}
        >
          Offer draw
        </Button>
        <Button
          onClick={() => {
            Ws.resign(actionConst.ACCEPT);
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
