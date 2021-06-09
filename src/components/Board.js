import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, analysis } from '../actions/serverActions';
import { click as clickSquare, start as startBoard } from '../actions/boardActions';
import History from './History';
import Pgn from '../utils/Pgn';
import Piece from '../utils/Piece';

const Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const render = () => {
    let board = [];
    let color;
    let k = 0;
    state.board.history[state.board.history.length - 1 + state.history.back].forEach((rank, i) => {
      let row = [];
      rank.forEach((piece, j) => {
          (i + k) % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
          const payload = {
            i: i,
            j: j,
            piece: piece
          };
          row.push(<div
              key={k}
              className={['square', color].join(' ')}
              onClick={() => dispatch(clickSquare(payload))}
              >
              <span>
                {Piece.unicode[piece].char}
              </span>
            </div>
          );
          k++;
      });
      board.push(<div key={i} className="board-row">{row}</div>);
    });

    return board;
  }

  return (
    <div>
      <div className="game">
        <div>
          <button onClick={() => {
            dispatch(startBoard({ back: state.board.history.length - 1 }));
            dispatch(connect(props.host, props.port)).catch(e => {});
          }}>Connect</button>

          <button onClick={() => {
            dispatch(startBoard({ back: state.board.history.length - 1 }));
            dispatch(analysis(state.server.ws));
          }}>Analysis board</button>
        </div>

        <div className={['board', state.history.back > 0 ? 'past' : 'present'].join(' ')}>
          {render()}
        </div>
      </div>
      <History />
    </div>
  );
}

export default Board;
