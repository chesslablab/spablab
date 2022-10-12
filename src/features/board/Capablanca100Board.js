import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import Piece from '../../common/Piece';
import * as boardSlice from '../../features/board/boardSlice';
import Squares from '../../features/board/Squares';
import * as modeConst from '../../features/mode/modeConst';
import WsAction from '../../ws/WsAction';

const Capablanca100Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };
  const sqSize = maxWidth['600'] ? 12 : maxWidth['900'] ? 10 : 4.1;
  const sqsRef = useRef([]);
  const imgsRef = useRef([]);

  const handleMove = (payload) => {
    if (state.mode.name !== modeConst.UNDEFINED) {
      if (!state.board.isMate && state.history.back === 0) {
        if (state.board.turn === Piece.color(payload.piece)) {
          dispatch(boardSlice.pickPiece(payload));
          WsAction.legalSqs(state, payload.sq);
        } else if (state.board.picked) {
          dispatch(boardSlice.leavePiece(payload));
        }
      }
    }
  };

  return <Squares props={{
    className: 'capablanca100Board',
    imgsRef: imgsRef,
    sqsRef: sqsRef,
    handleMove: handleMove
  }}/>;
}

export default Capablanca100Board;
