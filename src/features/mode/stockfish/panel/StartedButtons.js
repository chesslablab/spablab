import { useSelector } from 'react-redux';
import { Pgn } from '@chesslablab/reactblab';
import { Button, ButtonGroup } from '@mui/material/';
import Ws from 'socket/Ws';

const StartedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  if (stateBoard.movetext) {
    return (
      <ButtonGroup
        size="small"
        variant="text"
        aria-label="Game Buttons"
        orientation="vertical"
        fullWidth={true}
      >
        <Button
          disabled={
            (statePanel.history.back !== 0) ||
            (stateBoard.turn === Pgn.symbol.BLACK && stateBoard.fen.length === 2)
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
