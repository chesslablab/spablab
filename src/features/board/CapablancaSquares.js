import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Piece from 'common/Piece';
import * as board from 'features/board/boardSlice';
import Squares from 'features/board/Squares';
import Ws from 'features/ws/Ws';

const CapablancaSquares = () => {
  const state = useSelector(state => state.board);

  const dispatch = useDispatch();

  return (
    <Squares props={{
      className: 'capablancaSquares',
      imgsRef:  useRef([]),
      sqsRef: useRef([]),
      handleMove: (payload) => {
        if (state.turn === Piece.color(payload.piece)) {
          dispatch(board.grabPiece(payload));
          Ws.legal(payload.sq);
        } else {
          dispatch(board.placePiece(payload));
        }
      }
    }} />
  );
}

export default CapablancaSquares;
