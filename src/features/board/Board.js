import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CapablancaBoard,
  CapablancaFischerBoard,
  ClassicalBoard,
  Chess960Board,
  color
} from 'react-board';
import * as board from 'features/board/boardSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';

export const Board = () => {
  const stateActiveMode = useSelector(state => Object.values(state).find((val, key) => val.active));

  const stateBoard = useSelector(state => state.board);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

  const filterMove = () => {
    // TODO

    return true;
  };

  const handleMove = (payload) => {
    if (stateBoard.turn === color(payload.piece)) {
      dispatch(board.grabPiece(payload));
      Ws.legal(payload.sq);
    } else {
      dispatch(board.placePiece(payload));
    }
  };

  if (stateActiveMode?.variant === variantConst.CAPABLANCA) {
    return (
      <CapablancaBoard
        props={stateBoard}
        filterMove={filterMove}
        handleMove={handleMove}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CAPABLANCA_FISCHER) {
    return (
      <CapablancaFischerBoard
        props={stateBoard}
        filterMove={filterMove}
        handleMove={handleMove}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CHESS_960) {
    return (
      <Chess960Board
        props={stateBoard}
        filterMove={filterMove}
        handleMove={handleMove}
      />
    );
  }

  return (
    <ClassicalBoard
      props={stateBoard}
      filterMove={filterMove}
      handleMove={handleMove}
    />
  );
}
