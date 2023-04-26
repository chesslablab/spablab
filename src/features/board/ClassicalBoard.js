import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import Animation from 'common/Animation';
import Piece from 'common/Piece';
import * as board from 'features/board/boardSlice';
import Squares from 'features/board/Squares';
import WsAction from 'features/ws/WsAction';

const ClassicalBoard = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };
  const sqSize = maxWidth['600'] ? 12 : maxWidth['900'] ? 10 : 4.1;
  const sqsRef = useRef([]);
  const imgsRef = useRef([]);

  useEffect(() => {
    if (isInitialMount.name) {
      isInitialMount.name = false;
    } else {
      new Animation(sqSize, imgsRef, sqsRef).piece();
    }
  }, [
    state.board.fen.length,
    sqSize
  ]);

  const handleMove = (payload) => {
    if (state.board.turn === Piece.color(payload.piece)) {
      dispatch(board.pickPiece(payload));
      WsAction.legal(payload.sq);
    } else {
      dispatch(board.putPiece(payload));
    }
  }

  return <Squares props={{
    className: 'classicalBoard',
    imgsRef: imgsRef,
    sqsRef: sqsRef,
    handleMove: handleMove
  }}/>;
}

export default ClassicalBoard;
