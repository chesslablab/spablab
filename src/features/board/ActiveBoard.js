import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CapablancaBoard,
  ClassicalBoard,
  color
} from '@chesslablab/react-board';
import * as board from 'features/board/boardSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';

const ActiveBoard = () => {
  const stateActiveMode = useSelector(state => Object.values(state).find((val, key) => val.active));

  const stateRavMode = useSelector(state => state.ravMode);

  const statePlayMode = useSelector(state => state.playMode);

  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Ws.connect()).then(() => Ws.start(variantConst.CLASSICAL, modeConst.FEN));
  }, [dispatch]);

  useEffect(() => {
    if (stateBoard.lan && !stateBoard.pieceGrabbed) {
      const from = stateBoard.lan?.charAt(1);
      const to = stateBoard.lan?.charAt(3);
      if (
        from === '7' && to === '8' &&
        stateBoard.piecePlaced?.ascii === ' P '
      ) {
        dispatch(board.promotionDialog({ open: true }));
      } else if (
        from === '2' && to === '1' &&
        stateBoard.piecePlaced?.ascii === ' p '
      ) {
        dispatch(board.promotionDialog({ open: true }));
      } else {
        Ws.playLan();
      }
    }
  }, [
    stateBoard.pieceGrabbed,
    stateBoard.lan,
    stateBoard.piecePlaced?.ascii,
    dispatch
  ]);

  const filterMove = () => {
    if (stateRavMode.active) {
      return false;
    } else if (statePlayMode.active) {
      if (
        !statePlayMode.accepted ||
        stateBoard.isMate ||
        stateBoard.isStalemate ||
        statePlayMode.draw ||
        statePlayMode.resign ||
        statePlayMode.leave ||
        statePlayMode.timeOut ||
        statePanel.history.back !== 0
      ) {
        return false;
      }
      if (statePlayMode.accepted) {
        if (stateBoard.turn !== statePlayMode.play.color) {
          return false;
        }
      }
    } else {
      if (
        stateBoard.isMate ||
        stateBoard.isStalemate ||
        statePanel.history.back !== 0
      ) {
        return false;
      }
    }

    return true;
  }

  if (stateActiveMode?.variant === variantConst.CAPABLANCA) {
    return (
      <CapablancaBoard
        stateBoard={stateBoard}
        goBack={statePanel.history.back}
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
        stateBoard={stateBoard}
        goBack={statePanel.history.back}
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
        stateBoard={stateBoard}
        goBack={statePanel.history.back}
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
      stateBoard={stateBoard}
      goBack={statePanel.history.back}
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

export default ActiveBoard;
