'use client'

import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';

const StartedButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

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
          id="StartedButtons-Button-undoMove"
          disabled={statePanel.history.back !== 0}
          onClick={() => dispatch({ type: 'ws/undo' })}
        >
          Takeback
        </Button>
      </ButtonGroup>
    );
  }

  return null;
}

export default StartedButtons;
