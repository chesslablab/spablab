import { ClassicalBoard, color } from 'react-board';
import * as variantConst from 'features/mode/variantConst';
import Pgn from 'common/Pgn';
import Ascii from 'common/Ascii';
import { useState } from 'react';

export const Board = () => {
  const initialState = {
    variant: variantConst.CLASSICAL,
    turn: Pgn.symbol.WHITE,
    isCapture: false,
    isCheck: false,
    isMate: false,
    isStalemate: false,
    fen: [Ascii.initialFen()],
    flip: Pgn.symbol.WHITE,
    size: {
      files: 8,
      ranks: 8
    },
  };

  const [state, setState] = useState(initialState);

  const grabPiece = (payload) => {
    const fen = state.fen[state.fen.length - 1].split(' ');
    const ascii = Ascii.toAscii(fen[0]);
    const newState = Object.assign({}, state);
    newState.lan = payload.sq;
    newState.pieceGrabbed = {
      i: payload.i,
      j: payload.j,
      sq: payload.sq,
      ascii: ascii[payload.i][payload.j],
    };
    setState(newState);
  };

  const placePiece = (payload) => {
    if (state.pieceGrabbed) {
      const newState = Object.assign({}, state);
      if (state.pieceGrabbed.ascii === ' . ') {
        delete newState.pieceGrabbed;
      } else {
        newState.lan += payload.sq;
        newState.turn = newState.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        newState.piecePlaced = payload.piecePlaced;
        delete newState.pieceGrabbed;
      }
      setState(newState);
    }
  };

  const filterMove = () => {
    // TODO

    return true;
  };

  const handleMove = (payload) => {
    if (state.turn === color(payload.piece)) {
      grabPiece(payload);
    } else {
      placePiece(payload);
    }
  };

  return (
    <ClassicalBoard
      props={state}
      filterMove={filterMove}
      handleMove={handleMove}
    />
  );
}
