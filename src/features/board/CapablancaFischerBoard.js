import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Piece from 'common/Piece';
import * as board from 'features/board/boardSlice';
import Squares from 'features/board/Squares';
import Ws from 'features/ws/Ws';

const CapablancaFischerBoard = () => {
  const state = useSelector(state => state.board);

  const dispatch = useDispatch();

  return (
    <Squares props={{
      className: 'capablancaBoard',
      imgsRef:  useRef([]),
      sqsRef: useRef([]),
      handleMove: (payload) => {
        if (state.turn === Piece.color(payload.piece)) {
          // allow the king to be dropped into the castling rook
          if (state.pieceGrabbed?.fen) {
            if (Object.keys(state.pieceGrabbed.fen).includes(payload.sq)) {
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
      }
    }} />
  );
}

export default CapablancaFischerBoard;
