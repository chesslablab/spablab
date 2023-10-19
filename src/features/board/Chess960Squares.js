import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import Animation from 'common/Animation';
import * as SvgPiece from 'features/board/piece/SvgPiece';
import * as board from 'features/board/boardSlice';
import Squares from 'features/board/Squares';
import Ws from 'features/ws/Ws';

const Chess960Squares = () => {
  const state = useSelector(state => state.board);

  const dispatch = useDispatch();

  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };

  const sqSize = maxWidth['600'] ? 12 : maxWidth['900'] ? 10 : 4;

  const sqsRef = useRef([]);

  const imgsRef = useRef([]);

  useEffect(() => {
    new Animation(sqSize, imgsRef, sqsRef).piece();
  }, [
    state.fen,
    sqSize
  ]);

  return (
    <Squares props={{
      className: 'classicalSquares',
      imgsRef: imgsRef,
      sqsRef: sqsRef,
      handleMove: (payload) => {
        if (state.turn === SvgPiece.color(payload.piece)) {
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

export default Chess960Squares;
