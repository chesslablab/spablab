import Pieces from '../global/Pieces.js';
import React from 'react';
import Square from './Square.js';
import Symbol from '../global/Symbol.js';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      move: {
        status: null,
        piece: null,
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

  pickPiece(square) {
    let piece = this.state.pieces[square];
    if (piece !== undefined) {
      let newState = this.state;
      newState.move = {
        status: 'progress',
        piece: piece,
        from: square
      };
      this.setState(newState);

      console.log(this.state.move);
    } else {

      let newState = this.state;

      newState.move = {
        status: 'complete',
        piece: this.state.move.piece,
        from: this.state.move.from,
        to: square
      };

      // delete newState.pieces['h1'];
      // delete newState.pieces['h2'];

      delete newState.pieces[this.state.move.from];

      newState.pieces[this.state.move.to] = this.state.move.piece;

      console.log(newState);


      this.setState(newState);

      // console.log(this.state);
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
      let square = String.fromCharCode(ascii) + number;
      row.push(<Square
        square={square}
        color={color}
        state={this.state}
        onClick={() => this.pickPiece(square)} />
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
