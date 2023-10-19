import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Ascii,
  CapablancaBoard,
  CapablancaFischerBoard,
  ClassicalBoard,
  Chess960Board,
  color
} from 'react-board';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Pgn from 'common/Pgn';
import Ws from 'features/ws/Ws';

export const Board = () => {
  const stateActiveMode = useSelector(state => Object.values(state).find((val, key) => val.active));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

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

  if (stateActiveMode?.variant === variantConst.CAPABLANCA) {
    return (
      <CapablancaBoard
        props={state}
        filterMove={filterMove}
        handleMove={handleMove}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CAPABLANCA_FISCHER) {
    return (
      <CapablancaFischerBoard
        props={state}
        filterMove={filterMove}
        handleMove={handleMove}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CHESS_960) {
    return (
      <Chess960Board
        props={state}
        filterMove={filterMove}
        handleMove={handleMove}
      />
    );
  }

  return (
    <ClassicalBoard
      props={state}
      filterMove={filterMove}
      handleMove={handleMove}
    />
  );
}
