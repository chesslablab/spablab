import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import Pgn from 'common/Pgn';
import * as modeConst from 'features/mode/modeConst';
import WsAction from 'features/ws/WsAction';

const StartedButtonsStockfishMode = () => {
  const state = useSelector(state => state);

  if (state.mode.name === modeConst.STOCKFISH) {
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
              (state.history.back !==0) ||
              (state.mode.computer.color !== state.board.turn) ||
              (state.board.turn === Pgn.symbol.BLACK && state.board.fen.length === 2)
            }
            onClick={() => {
              WsAction.undo();
              WsAction.undo();
          }}>
            Undo move
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default StartedButtonsStockfishMode;
