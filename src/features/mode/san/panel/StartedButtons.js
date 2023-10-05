import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Ws from 'features/ws/Ws';

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
          id="StartedButtons-Button-undoMove"
          disabled={statePanel.history.back !== 0}
          onClick={() => Ws.undo()}
        >
          Takeback
        </Button>
      </ButtonGroup>
    );
  }

  return null;
}

export default StartedButtons;
