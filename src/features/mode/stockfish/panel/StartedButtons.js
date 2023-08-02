import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Pgn from 'common/Pgn';
import Ws from 'features/ws/Ws';
import * as eventConst from 'features/eventConst';

const StartedButtons = () => {
  const state = useSelector(state => state);

  if (state.stockfishMode.active) {
    if (state.board.movetext) {
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
              (state.panel.history.back !== 0) ||
              (state.board.turn === Pgn.symbol.BLACK && state.board.fen.length === 2) ||
              state.board.piecePlaced?.event === eventConst.ON_MOUSE_DOWN
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
  }

  return null;
}

export default StartedButtons;
