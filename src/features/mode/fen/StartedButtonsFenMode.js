import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import * as modeConst from 'features/mode/modeConst';
import WsAction from 'features/ws/WsAction';

const StartedButtonsFenMode = () => {
  const state = useSelector(state => state);

  if (state.mode.name === modeConst.FEN) {
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
            id="StartedButtonsFenMode-Button-undoMove"
            disabled={state.history.back !== 0}
            onClick={() => WsAction.undo()}
          >
            Undo move
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default StartedButtonsFenMode;
