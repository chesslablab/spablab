import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import * as modeConst from '../common/constants/mode';
import Ascii from '../common/Ascii';
import Pgn from '../common/Pgn';
import Piece from '../common/Piece';
import * as boardSlice from '../features/boardSlice';
import WsAction from '../ws/WsAction';

const Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const maxWidth = {
    '600': useMediaQuery("(max-width:600px)"),
    '900': useMediaQuery("(max-width:900px)")
  };
  const sqSize = maxWidth['600'] ? 12 : maxWidth['900'] ? 10 : 4.1;

  let r = document.querySelector(':root');
  r.style.setProperty('--sqSize', `${sqSize}vw`);

  useEffect(() => {
    dispatch(WsAction.connect(state, props)).then(ws => WsAction.startAnalysis(ws));
  }, [dispatch]);

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
      if (
        !state.board.isMate &&
        state.history.back === 0
      ) {
        if (state.board.picked && state.board.turn !== Piece.color(payload.piece)) {
          dispatch(boardSlice.leavePiece(payload));
        } else if (state.board.turn === Piece.color(payload.piece)) {
          dispatch(boardSlice.pickPiece(payload));
          WsAction.legalSqs(state, payload.sq);
        }
      }
    }
  };

  const board = () => {
    return Ascii.flip(
      state.board.flip,
      state.board.history[state.board.history.length - 1 + state.history.back]
    ).map((rank, i) => {
      return rank.map((piece, j) => {
        let payload = { piece: piece };
        let isLegal, isSelected, isCheck = '';
        let color = (i + j) % 2 !== 0 ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        state.board.flip === Pgn.symbol.WHITE
          ? payload = {...payload, i: i, j: j, sq: Ascii.fromIndexToAlgebraic(i, j)}
          : payload = {...payload, i: 7 - i, j: 7 - j, sq: Ascii.fromIndexToAlgebraic(7 - i, 7 - j)};
        if (state.board.picked) {
          if (state.board.picked.sq === payload.sq) {
            isSelected = 'isSelected';
          }
          if (state.board.picked.legal_sqs) {
            if (state.board.picked.legal_sqs.includes(payload.sq)) {
              isLegal = 'isLegal';
            }
          }
        } else if (state.board.isCheck) {
          if (state.board.turn === Pgn.symbol.WHITE) {
            if (piece === ' K ') {
              isCheck = 'isCheck';
            }
          } else if (state.board.turn === Pgn.symbol.BLACK) {
            if (piece === ' k ') {
              isCheck = 'isCheck';
            }
          }
        }

        return <div
          key={'' + i + j}
          className={[
              'sq',
              color,
              payload.sq,
              isLegal,
              isSelected,
              isCheck
            ].join(' ')
          }
          onClick={() => {
            handleMove(payload);
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            handleMove(payload);
          }}
          onDragOver={(ev) => {
            ev.preventDefault();
          }}>
            {
              Piece.unicode[piece].char
                ? <img
                    data-unicode={piece}
                    src={Piece.unicode[piece].char}
                    draggable={Piece.color(piece) === state.board.turn ? true : false}
                    onDragStart={() => handleMove(payload)}
                  />
                : null
            }
        </div>
      });
    });
  }

  return (
    <div className={['board', state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {board()}
    </div>
  );
}

export default Board;
