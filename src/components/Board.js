import BoardStore from '../stores/BoardStore.js';
import HistoryStore from '../stores/HistoryStore.js';
import History from './History.js';
import Pgn from '../utils/Pgn.js';
import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = BoardStore.getState();
  }

  renderRow(number) {
    let ascii = 96;
    let color;
    let row = [];
    number % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
    for (let i=1; i<=8; i++) {
      ascii++;
      let square = String.fromCharCode(ascii) + number;
      row.push(<Square
        square={square}
        color={color} />
      );
      color = color === Pgn.symbol.BLACK ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
    }

    return row;
  }

  renderRows() {
    let board = [];
    for (let i=8; i>=1; i--) {
      board.push(<div
        key={i}
        className="board-row">
          {this.renderRow(i)}
      </div>
      );
    }

    return board;
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="options">
            <button onClick={() => this.reset()}>New game</button>
          </div>
          <div className={['board', HistoryStore.getState().back > 0 ? 'past' : 'present'].join(' ')}>
            {this.renderRows()}
          </div>
        </div>
        <History />
      </div>
    );
  }
}
