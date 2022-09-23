import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import * as modeConst from '../../features/mode/modeConst';
import Animation from '../../common/Animation';
import Piece from '../../common/Piece';
import * as boardSlice from '../../features/board/boardSlice';
import Squares from '../../features/board/Squares';
import WsAction from '../../ws/WsAction';

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
    dispatch(WsAction.connect(state, props)).then(ws => WsAction.startOff(ws));
  }, [dispatch]);

  useEffect(() => {
    if (isInitialMount.name) {
      isInitialMount.name = false;
    } else {
      if (state.board.movetext) {
        if (state.mode.name === modeConst.STOCKFISH) {
          if (state.mode.computer.color === state.board.turn) {
            new Animation(sqSize, imgsRef, sqsRef).pieces();
          }
        } else if (state.mode.name === modeConst.PLAY) {
          if (state.mode.play.color === state.board.turn) {
            new Animation(sqSize, imgsRef, sqsRef).pieces();
          }
        }
      }
    }
  }, [state.board.history.length]);

  const handleMove = (payload) => {
    if (state.mode.name === modeConst.PLAY) {
      if (
        !state.board.isMate &&
        !state.mode.play.draw &&
        !state.mode.play.resign &&
        !state.mode.play.leave &&
        !state.mode.play.timer.over &&
        state.history.back === 0
      ) {
        if (state.board.picked && state.board.turn !== Piece.color(payload.piece)) {
          dispatch(boardSlice.leavePiece(payload));
        } else if (state.mode.play.accepted) {
          if (state.mode.play.color === state.board.turn) {
            if (state.board.turn === Piece.color(payload.piece)) {
              dispatch(boardSlice.pickPiece(payload));
              WsAction.legalSqs(state, payload.sq);
            }
          }
        }
      }
    } else if (state.mode.name !== modeConst.UNDEFINED) {
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
    imgsRef: imgsRef,
    sqsRef: sqsRef,
    handleMove: handleMove
  }}/>;
}

export default ClassicalBoard;
