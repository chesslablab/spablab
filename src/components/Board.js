import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnect, wsMssgStartAnalysis, wsMssgPiece } from '../actions/serverActions';
import boardActionTypes from '../constants/boardActionTypes';
import modeNames from '../constants/modeNames';
import Ascii from '../utils/Ascii';
import Pgn from '../utils/Pgn';
import Piece from '../utils/Piece';

const Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect(state, props)).then(ws => wsMssgStartAnalysis(ws));
  }, [dispatch]);

  const pickPiece = (payload) => {
    if (modeNames.ANALYSIS === state.mode.current || modeNames.LOADFEN === state.mode.current) {
      if (state.board.turn === Piece.color(payload.piece)) {
        dispatch({
          type: boardActionTypes.PICK_PIECE,
          payload: payload
        });
        wsMssgPiece(state, payload.algebraic);
      }
    } else if (modeNames.PLAYFRIEND === state.mode.current) {
      if (state.mode.playfriend.accepted) {
        if (state.mode.playfriend.color === state.board.turn) {
          if (state.board.turn === Piece.color(payload.piece)) {
            dispatch({
              type: boardActionTypes.PICK_PIECE,
              payload: payload
            });
            wsMssgPiece(state, payload.algebraic);
          }
        }
      }
    }
  };

  const board = () => {
    let rows = [];
    let color;
    let k = 0;
    Ascii.flip(
      state.board.flip,
      state.board.history[state.board.history.length - 1 + state.history.back]
    ).forEach((rank, i) => {
      let row = [];
      rank.forEach((piece, j) => {
          let payload = { piece: piece };
          let isLegal = '';
          let isSelected = '';
          let isCheck = '';
          (i + k) % 2 !== 0
            ? color = Pgn.symbol.BLACK
            : color = Pgn.symbol.WHITE;
          state.board.flip === Pgn.symbol.WHITE
            ? payload = {...payload, i: i, j: j, algebraic: Ascii.fromIndexToAlgebraic(i, j)}
            : payload = {...payload, i: 7 - i, j: 7 - j, algebraic: Ascii.fromIndexToAlgebraic(7 - i, 7 - j)};
          // todo: use the optional chaining operator
          if (state.board.picked) {
            if (state.board.picked.algebraic === payload.algebraic) {
              isSelected = 'is-selected';
            }
            if (state.board.picked.legal_moves) {
              if (state.board.picked.legal_moves.includes(payload.algebraic)) {
                isLegal = 'is-legal';
              }
            }
          } else if (state.board.check) {
            if (state.board.turn === Pgn.symbol.WHITE) {
              if (piece === ' K ') {
                isCheck = 'is-check';
              }
            } else if (state.board.turn === Pgn.symbol.BLACK) {
              if (piece === ' k ') {
                isCheck = 'is-check';
              }
            }
          }
          row.push(<div
              key={k}
              className={['square', color, payload.algebraic, isLegal, isSelected, isCheck].join(' ')}
              onClick={() => {
                if (!state.board.mate && state.history.back === 0) {
                  if (state.board.picked && state.board.turn !== Piece.color(payload.piece)) {
                    dispatch({
                      type: boardActionTypes.LEAVE_PIECE,
                      payload: payload
                    });
                  } else {
                    pickPiece(payload);
                  }
                }
              }}>
              <span tabIndex={k}>
                <img src={Piece.unicode[piece].char} />
              </span>
            </div>
          );
          k++;
      });
      rows.push(<div key={i} className="board-row">{row}</div>);
    });

    return rows;
  }

  return (
    <div className={['board', state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
      {board()}
    </div>
  );
}

export default Board;
