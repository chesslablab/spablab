import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset as resetBoard } from 'actions/boardActions';
import History from 'components/History';
import Square from 'components/Square';
import Pgn from 'utils/Pgn';
import { ascii } from 'utils/Pieces';

const Board = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const renderBoard = () => {
    let board = [];
    let color;
    let k = 0;
    ascii.forEach((rank, i) => {
      let row = [];
      rank.forEach((piece, j) => {
          (i + k) % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
          row.push(<Square
            key={k}
            piece={piece}
            color={color} />
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
          <button onClick={() => dispatch(resetBoard())}>New game</button>
        </div>
        <div className={['board', state.history.back > 0 ? 'past' : 'present'].join(' ')}>
          {renderBoard()}
        </div>
      </div>
      <History />
    </div>
  );
}

export default Board;
