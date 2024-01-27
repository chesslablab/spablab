import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material/';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as actionConst from 'features/mode/actionConst';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const FinishedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const enabled = stateBoard.isMate ||
    stateBoard.isStalemate ||
    statePlayMode.draw === actionConst.ACCEPT ||
    statePlayMode.resign === actionConst.ACCEPT ||
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
              Ws.rematch(actionConst.PROPOSE);
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
