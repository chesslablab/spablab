import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Pgn from 'common/Pgn';
import Ws from 'features/ws/Ws';
import * as eventConst from 'features/eventConst';

const StartedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  if (stateBoard.movetext) {
    return (
      <ButtonGroup
        sx={{ mt: 1.5 }}
        size="small"
        aria-label="Game Buttons"
        orientation="vertical"
        fullWidth={true}
      >
        <Button
          disabled={
            (statePanel.history.back !== 0) ||
            (stateBoard.turn === Pgn.symbol.BLACK && stateBoard.fen.length === 2) ||
            stateBoard.piecePlaced?.event === eventConst.ON_MOUSE_DOWN
          }
          onClick={() => {
            Ws.undo();
            Ws.undo();
        }}>
          Takeback
        </Button>
      </ButtonGroup>
    );
  }

  return null;
}

export default StartedButtons;
