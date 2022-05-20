import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import boardActionTypes from '../constants/boardActionTypes';
import modeNames from '../constants/modeNames';
import Ascii from '../utils/Ascii';
import Pgn from '../utils/Pgn';
import Piece from '../utils/Piece';
import WsAction from '../ws/WsAction';

const Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WsAction.connect(state, props)).then(ws => WsAction.startAnalysis(ws));
  }, [dispatch]);

  const pickPiece = (payload) => {
    if (
      modeNames.ANALYSIS === state.mode.current ||
      modeNames.GRANDMASTER === state.mode.current ||
      modeNames.LOADFEN === state.mode.current ||
      modeNames.LOADPGN === state.mode.current
    ) {
      if (state.board.turn === Piece.color(payload.piece)) {
        dispatch({
          type: boardActionTypes.PICK_PIECE,
          payload: payload
        });
        WsAction.legalSqs(state, payload.sq);
      }
    } else if (modeNames.PLAY === state.mode.current) {
      if (state.mode.play.accepted) {
        if (state.mode.play.color === state.board.turn) {
          if (state.board.turn === Piece.color(payload.piece)) {
            dispatch({
              type: boardActionTypes.PICK_PIECE,
              payload: payload
            });
            WsAction.legalSqs(state, payload.sq);
          }
        }
      }
    }
  };

  const handleMove = (payload) => {
    if (!state.board.isMate &&
      !state.mode.play.draw &&
      !state.mode.play.resign &&
      !state.mode.play.timer.over &&
      state.history.back === 0
    ) {
      if (state.board.picked && state.board.turn !== Piece.color(payload.piece)) {
        dispatch({
          type: boardActionTypes.LEAVE_PIECE,
          payload: payload,
        });
      } else {
        pickPiece(payload);
      }
    }
  };

  const board = () => {
    let squares = [];
    let color;
    let k = 0;
    Ascii.flip(
      state.board.flip,
      state.board.history[state.board.history.length - 1 + state.history.back]
    ).forEach((rank, i) => {
      rank.forEach((piece, j) => {
          let img;
          let payload = { piece: piece };
          let isLegal, isSelected, isCheck = '';
          (i + j) % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
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
          if (Piece.unicode[piece].char) {
            img = <img src={Piece.unicode[piece].char}
              draggable="true"
              onDragStart={(ev) => {
                handleMove(payload);
              }}
            />;
          }
          squares.push(<div
              key={k}
              className={['square', color, payload.sq, isLegal, isSelected, isCheck].join(' ')}
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
              {img}
            </div>
          );
          k++;
      });
    });

    return squares;
  }

  return (
    <div className={['board', state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {board()}
    </div>
  );
}

export default Board;
