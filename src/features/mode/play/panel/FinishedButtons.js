import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import Wording from "common/Wording.js";
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const FinishedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const enabled = stateBoard.isMate ||
    stateBoard.isStalemate ||
    statePlayMode.draw === Wording.verb.ACCEPT.toLowerCase() ||
    statePlayMode.resign === Wording.verb.ACCEPT.toLowerCase() ||
    statePlayMode.timeOut;

    if (statePlayMode.accepted) {
      return (
        <ButtonGroup
          sx={{ mt: 1.5 }}
          variant="text"
          orientation="vertical"
          size="small"
          aria-label="Game Over"
          fullWidth={true}
          disabled={!enabled}
        >
          <Button
            onClick={() => {
              dispatch(infoAlert.show({
                mssg: 'Waiting for the opponent to accept or decline.'
              }));
              dispatch(playMode.proposeRematch());
              Ws.rematch(Wording.verb.PROPOSE.toLowerCase());
            }}
          >
            Offer Rematch
          </Button>
        </ButtonGroup>
      );
    }

    return null;
}

export default FinishedButtons;
