import Pieces from '../global/Pieces.js';
import React from 'react';
import Square from './Square.js';
import Symbol from '../global/Symbol.js';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      move: {
        color: null,
        piece: null,
        symbol: null,
        square: {
          from: null,
          to: null
        }
      },
      pieces: Pieces
    };
  }

  switchColor(color) {
    if (color === Symbol.BLACK) {
      return Symbol.WHITE;
    } else {
      return Symbol.BLACK;
    }
  }

  renderRow(number) {
    let ascii = 96;
    let color;
    let row = [];

    if (number % 2 !== 0) {
      color = Symbol.BLACK;
    } else {
      color = Symbol.WHITE;
    }

    for (let i=1; i<=8; i++) {
      ascii++;
      row.push(<Square
        square={String.fromCharCode(ascii) + number}
        color={color}
        state={this.state}
        onClick={() => alert('foo')} />
      );
      color = this.switchColor(color);
    }

    return row;
  }

  renderBoard() {
    let board = [];

    for (let i=8; i>=1; i--) {
      board.push(<div className="board-row">
        {this.renderRow(i)}
      </div>
      );
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}
