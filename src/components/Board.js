import Pieces from '../global/Pieces.js';
import React from 'react';
import Square from './Square.js';
import Symbol from '../global/Symbol.js';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      move: null,
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

  movePiece(square) {
    let piece = this.state.pieces[square];
    let newState = this.state;

    switch (true) {
      // leave piece on empty square
      case this.state.move !== null && piece === undefined:
        newState.move = this.state.move;
        newState.move.to = square;
        delete newState.pieces[this.state.move.from];
        newState.pieces[this.state.move.to] = this.state.move.piece;
        newState.move = null;
        this.setState(newState);
        break;
      // pick piece on non-empty square
      case this.state.move === null && piece !== undefined:
        newState.move = {
          piece: piece,
          from: square
        };
        this.setState(newState);
        break;
      // leave piece on non-empty square
      case this.state.move !== null && piece !== undefined:
        newState.move = this.state.move;
        newState.move.to = square;
        delete newState.pieces[this.state.move.from];
        newState.pieces[this.state.move.to] = this.state.move.piece;
        newState.move = null;
        this.setState(newState);
        break;
      // pick piece on empty square
      default:
        // do nothing
        break;
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
        key={i}
        square={square}
        color={color}
        state={this.state}
        onClick={() => this.movePiece(square)} />
      );
      color = this.switchColor(color);
    }

    return row;
  }

  renderBoard() {
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
        {this.renderBoard()}
      </div>
    );
  }
}
