import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CapablancaBoard,
  ClassicalBoard,
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

  if (stateActiveMode?.variant === variantConst.CAPABLANCA) {
    return (
      <CapablancaBoard
        props={stateBoard}
        filterMove={filterMove}
        handleMove={(payload) => {
          if (stateBoard.turn === color(payload.piece)) {
            dispatch(board.grabPiece(payload));
            Ws.legal(payload.sq);
          } else {
            dispatch(board.placePiece(payload));
          }
        }}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CAPABLANCA_FISCHER) {
    return (
      <CapablancaBoard
        props={stateBoard}
        filterMove={filterMove}
        handleMove={(payload) => {
          if (stateBoard.turn === color(payload.piece)) {
            // allow the king to be dropped into the castling rook
            if (stateBoard.pieceGrabbed?.fen) {
              if (Object.keys(stateBoard.pieceGrabbed.fen).includes(payload.sq)) {
                dispatch(board.placePiece(payload));
              } else {
                dispatch(board.grabPiece(payload));
                Ws.legal(payload.sq);
              }
            } else {
              dispatch(board.grabPiece(payload));
              Ws.legal(payload.sq);
            }
          } else {
            dispatch(board.placePiece(payload));
          }
        }}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CHESS_960) {
    return (
      <ClassicalBoard
        props={stateBoard}
        filterMove={filterMove}
        handleMove={(payload) => {
          if (stateBoard.turn === color(payload.piece)) {
            // allow the king to be dropped into the castling rook
            if (stateBoard.pieceGrabbed?.fen) {
              if (Object.keys(stateBoard.pieceGrabbed.fen).includes(payload.sq)) {
                dispatch(board.placePiece(payload));
              } else {
                dispatch(board.grabPiece(payload));
                Ws.legal(payload.sq);
              }
            } else {
              dispatch(board.grabPiece(payload));
              Ws.legal(payload.sq);
            }
          } else {
            dispatch(board.placePiece(payload));
          }
        }}
      />
    );
  }

  return (
    <ClassicalBoard
      props={stateBoard}
      filterMove={filterMove}
      handleMove={(payload) => {
        if (stateBoard.turn === color(payload.piece)) {
          dispatch(board.grabPiece(payload));
          Ws.legal(payload.sq);
        } else {
          dispatch(board.placePiece(payload));
        }
      }}
    />
  );
}
