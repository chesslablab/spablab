import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Piece from 'common/Piece';
import * as board from 'features/board/boardSlice';
import Squares from 'features/board/Squares';
import Ws from 'features/ws/Ws';

const CapablancaBoard = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const sqsRef = useRef([]);
  const imgsRef = useRef([]);

  const handleMove = (payload) => {
    if (state.board.turn === Piece.color(payload.piece)) {
      dispatch(board.grabPiece(payload));
      Ws.legal(payload.sq);
    } else {
      dispatch(board.placePiece(payload));
    }
  }

  return <Squares props={{
    className: 'capablancaBoard',
    imgsRef: imgsRef,
    sqsRef: sqsRef,
    handleMove: handleMove
  }}/>;
}

export default CapablancaBoard;
