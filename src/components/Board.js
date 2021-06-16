import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analysis, connect, playfen, quit } from '../actions/serverActions';
import { click as clickSquare, start as startBoard, undo as undoIllegalMove } from '../actions/boardActions';
import History from './History';
import Pgn from '../utils/Pgn';
import Piece from '../utils/Piece';

const Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const board = () => {
    let rows = [];
    let color;
    let k = 0;
    state.board.history[state.board.history.length - 1 + state.history.back].forEach((rank, i) => {
      let row = [];
      rank.forEach((piece, j) => {
          (i + k) % 2 !== 0
            ? color = Pgn.symbol.BLACK
            : color = Pgn.symbol.WHITE;
          const payload = {
            i: i,
            j: j,
            piece: piece
          };
          row.push(<div
              key={k}
              className={['square', color].join(' ')}
              onClick={() => dispatch(clickSquare(payload))}>
              <span tabindex={k}>
                {Piece.unicode[piece].char}
              </span>
            </div>
          );
          k++;
      });
      rows.push(<div key={i} className="board-row">{row}</div>);
    });

    return rows;
  }

  if (!state.board.picked && state.board.fen) {
    dispatch(playfen(state.server.ws, state.board.fen)).then((data) => {
      if (!JSON.parse(data).legal) {
        dispatch(undoIllegalMove());
      }
    });
  }

  return (
    <div>
      <div className="game">
        <div>
          <button
            disabled={state.server.ws && state.server.ws.readyState === WebSocket.OPEN}
            onClick={() => {
              dispatch(startBoard({ back: state.board.history.length - 1 }));
              dispatch(connect(state.server.ws, props.host, props.port)).catch(e => {});
          }}>
            Connect
          </button>

          <button
            onClick={() => {
              dispatch(startBoard({ back: state.board.history.length - 1 }));
              if (state.server.ws) {
                dispatch(quit(state.server.ws)).then(() => {
                  dispatch(analysis(state.server.ws));
                });
              }
            }}>Analysis board</button>
        </div>

        <div className={['board', state.history.back !== 0 ? 'past' : 'present'].join(' ')}>
          {board()}
        </div>
      </div>
      <History />
    </div>
  );
}

export default Board;
