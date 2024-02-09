import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CapablancaBoard,
  ClassicalBoard,
  color
} from '@chesslablab/reactblab';
import * as board from 'features/board/boardSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';

const ActiveBoard = () => {
  const stateActiveMode = useSelector(state => Object.values(state).find((val, key) => val.active));

  const stateRavMode = useSelector(state => state.ravMode);

  const statePlayMode = useSelector(state => state.playMode);

  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'socket/connect' }).then(() => {
      dispatch({
        type: 'socket/start',
        payload: {
          variant: variantConst.CLASSICAL,
          mode: modeConst.FEN,
          settings: {},
        },
      });
    });
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
        dispatch({ type: 'socket/play_lan' });
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
        stateBoard={{
          fen: stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back],
          isCheck: stateBoard.isCheck,
          pieceGrabbed: stateBoard.pieceGrabbed,
          flip: stateBoard.flip,
        }}
        filterMove={filterMove}
        handleMove={(payload) => {
          if (stateBoard.turn === color(payload.piece)) {
            dispatch(board.grabPiece(payload));
            dispatch({
              type: 'socket/legal',
              payload: payload.sq,
            });
          } else {
            dispatch(board.placePiece(payload));
          }
        }}
        styleBoard={{
          sqSize: 3.95
        }}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CAPABLANCA_FISCHER) {
    return (
      <CapablancaBoard
        stateBoard={{
          fen: stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back],
          isCheck: stateBoard.isCheck,
          pieceGrabbed: stateBoard.pieceGrabbed,
          flip: stateBoard.flip,
        }}
        filterMove={filterMove}
        handleMove={(payload) => {
          if (stateBoard.turn === color(payload.piece)) {
            // allow the king to be dropped into the castling rook
            if (stateBoard.pieceGrabbed?.fen) {
              if (Object.keys(stateBoard.pieceGrabbed.fen).includes(payload.sq)) {
                dispatch(board.placePiece(payload));
              } else {
                dispatch(board.grabPiece(payload));
                dispatch({
                  type: 'socket/legal',
                  payload: payload.sq,
                });
              }
            } else {
              dispatch(board.grabPiece(payload));
              dispatch({
                type: 'socket/legal',
                payload: payload.sq,
              });
            }
          } else {
            dispatch(board.placePiece(payload));
          }
        }}
        styleBoard={{
          sqSize: 3.95
        }}
      />
    );
  } else if (stateActiveMode?.variant === variantConst.CHESS_960) {
    return (
      <ClassicalBoard
        stateBoard={{
          fen: stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back],
          isCheck: stateBoard.isCheck,
          pieceGrabbed: stateBoard.pieceGrabbed,
          flip: stateBoard.flip,
        }}
        filterMove={filterMove}
        handleMove={(payload) => {
          if (stateBoard.turn === color(payload.piece)) {
            // allow the king to be dropped into the castling rook
            if (stateBoard.pieceGrabbed?.fen) {
              if (Object.keys(stateBoard.pieceGrabbed.fen).includes(payload.sq)) {
                dispatch(board.placePiece(payload));
              } else {
                dispatch(board.grabPiece(payload));
                dispatch({
                  type: 'socket/legal',
                  payload: payload.sq,
                });
              }
            } else {
              dispatch(board.grabPiece(payload));
              dispatch({
                type: 'socket/legal',
                payload: payload.sq,
              });
            }
          } else {
            dispatch(board.placePiece(payload));
          }
        }}
        styleBoard={{
          sqSize: 4.9
        }}
      />
    );
  }

  return (
    <ClassicalBoard
      stateBoard={{
        fen: stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back],
        isCheck: stateBoard.isCheck,
        pieceGrabbed: stateBoard.pieceGrabbed,
        flip: stateBoard.flip,
      }}
      filterMove={filterMove}
      handleMove={(payload) => {
        if (stateBoard.turn === color(payload.piece)) {
          dispatch(board.grabPiece(payload));
          dispatch({
            type: 'socket/legal',
            payload: payload.sq,
          });
        } else {
          dispatch(board.placePiece(payload));
        }
      }}
      styleBoard={{
        sqSize: 4.9
      }}
    />
  );
}

export default ActiveBoard;
