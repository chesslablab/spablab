import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { click as clickSquare, analysis as analysisBoard } from 'actions/boardActions';
import History from 'components/History';
import Pgn from 'utils/Pgn';
import { unicode } from 'utils/Pieces';

const Board = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const render = () => {
    let board = [];
    let color;
    let k = 0;
    state.board.ascii.forEach((rank, i) => {
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
                {unicode[piece].char}
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
          <button onClick={() => dispatch(analysisBoard())}>Analysis</button>
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
