import Pgn from '../Pgn.js';
import Pieces from '../Pieces.js';
import React from 'react';
import Square from './Square.js';
import Symbol from '../Symbol.js';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      move: null,
      pieces: Object.assign({}, Pieces)
    };
  }

  newGame() {
    let newState = this.state;
    newState.history = [];
    newState.move = null;
    newState.pieces = Object.assign({}, Pieces);
    this.setState(newState);
  }

  switchColor(color) {
    return color === Symbol.BLACK ? Symbol.WHITE : Symbol.BLACK;
  }

  movePiece(square) {
    let piece = this.state.pieces[square];
    let newState = this.state;
    let pgn = null;

    switch (true) {
      // leave piece on empty square or leave piece on non-empty square
      case (this.state.move !== null && piece === undefined) || (this.state.move !== null && piece !== undefined):
        pgn = Pgn.convert({
          piece: this.state.move.piece,
          from: this.state.move.from,
          to: square
        });
        if (this.isLegalMove(pgn)) {
          delete newState.pieces[this.state.move.from];
          newState.move.to = square;
          newState.pieces[this.state.move.to] = this.state.move.piece;
          newState.history.push({
            color: this.state.move.piece.color,
            pgn: pgn
          });
          this.setState(newState);
          newState = this.state;
          newState.move = null;
          this.setState(newState);
        }
        break;

      // pick piece on non-empty square
      case this.state.move === null && piece !== undefined:
        newState.move = {
          piece: piece,
          from: square
        };
        this.setState(newState);
        break;

      // pick piece on empty square
      default:
        // do nothing
        break;
    }
  }

  // TODO
  // Validate move with PGN Chess
  isLegalMove(move) {
    // ...

    return true;
  }

  renderRow(number) {
    let ascii = 96;
    let color;
    let row = [];

    number % 2 !== 0 ? color = Symbol.BLACK : color = Symbol.WHITE;

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

  renderHistory() {
    let n = 1;
    let history = '';
    this.state.history.forEach(function (item, index) {
      if (index % 2 === 0) {
        history += n + '. ' + item.pgn;
        n++;
      } else {
        history = history + ' ' + item.pgn + ' ';
      }
    });

    return (
      <p>{history}</p>
    );
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="options">
            <button onClick={() => this.newGame()}>New game</button>
          </div>
          <div className="board">
            {this.renderRows()}
          </div>
          <div className="controls">
            <button>&lt;&lt;</button>
            <button>&lt;</button>
            <button>&gt;</button>
            <button>&gt;&gt;</button>
          </div>
        </div>
        <div className="history">
          {this.renderHistory()}
        </div>
      </div>
    );
  }
}
