import { Button, ButtonGroup } from '@mui/material/';
import Pgn from 'common/Pgn';
import Ws from 'features/ws/Ws';
import { useSelector } from 'react-redux';

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
              (state.panel.history.back !==0) ||
              (state.stockfishMode.computer.color !== state.board.turn) ||
              (state.board.turn === Pgn.symbol.BLACK && state.board.fen.length === 2)
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
