import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset as resetBoard } from "actions/boardActions";
import History from 'components/History';
import Square from 'components/Square';

export default function Board() {
  const renderRow = (number) => {
    let ascii = 96;
    let color;
    let row = [];
    number % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
    for (let i=1; i<=8; i++) {
      ascii++;
      let square = String.fromCharCode(ascii) + number;
      row.push(<Square
        key={i}
        square={square}
        color={color} />
      );
      color = color === Pgn.symbol.BLACK ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
    }

    return row;
  }

  const renderBoard = () => {
    let board = [];
    for (let i=8; i>=1; i--) {
      board.push(<div key={i} className="board-row">{renderRow(i)}</div>);
    }

    return board;
  }

  return (
    <div>
      <div className="game">
        <div>
          <button onClick={() => dispatch(resetBoard())}>New game</button>
        </div>
        <div>
          {renderBoard}
        </div>
      </div>
      <History />
    </div>
  );
}
