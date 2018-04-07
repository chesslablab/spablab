import Pgn from '../Pgn.js';
import Pieces from '../Pieces.js';
import React from 'react';
import Square from './Square.js';
import Symbol from '../Symbol.js';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: {
        back: 0,
        items: []
      },
      move: null,
      pieces: Object.assign({}, Pieces)
    };
    this.connect();
  }

  connect() {
      this.socket = new WebSocket('ws://' + this.props.server);
      this.socket.onerror = function(ev) {
        alert('Whoops! The websocket server is not running.');
      }
  }

  newGame() {
    let newState = this.state;
    newState.history = {
      back: 0,
      items: []
    };
    newState.move = null;
    newState.pieces = Object.assign({}, Pieces);
    this.setState(newState);
  }

  switchColor(color) {
    return color === Symbol.BLACK ? Symbol.WHITE : Symbol.BLACK;
  }

  validateMove(pgn, square) {
    let newState = this.state;
    this.socket.send(this.state.move.piece.color + ' ' + pgn);
    this.socket.onmessage = (function(ev) {
      if (ev.data === 'true') {
        delete newState.pieces[this.state.move.from];
        newState.move.to = square;
        newState.pieces[this.state.move.to] = this.state.move.piece;
        newState.history.items.push({
          pgn: pgn,
          move: newState.move
        });
        this.setState(newState);
        newState = this.state;
      }
      newState.move = null;
      this.setState(newState);
    }).bind(this);
  }

  movePiece(square) {
    if (this.state.history.back > 0) {
      return false;
    }

    let piece = this.state.pieces[square];
    let pgn = null;

    switch (true) {
      // leave piece on empty square
      case this.state.move !== null && piece === undefined:
        pgn = Pgn.convert({
          piece: this.state.move.piece,
          from: this.state.move.from,
          to: square
        });
        if (this.props.server !== undefined) {
          this.validateMove(pgn, square);
        }
        break;

      // leave piece on non-empty square
      case this.state.move !== null && piece !== undefined:
        pgn = Pgn.convert({
          piece: this.state.move.piece,
          from: this.state.move.from,
          to: square
        }, 'x');
        if (this.props.server !== undefined) {
          this.validateMove(pgn, square);
        }
        break;

      // pick piece on non-empty square
      case this.state.move === null && piece !== undefined:
        let newState = this.state;
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

  goBack() {
    if (this.state.history.back < this.state.history.items.length) {
      let newState = this.state;
      let pieces = Object.assign({}, Pieces);
      newState.history.back += 1;
      for (let i = 0; i < this.state.history.items.length - newState.history.back; i++) {
        delete pieces[this.state.history.items[i].move.from];
        pieces[this.state.history.items[i].move.to] = this.state.history.items[i].move.piece;
      }
      newState.pieces = pieces;
      this.setState(newState);
    }
  }

  goForward() {
    if (this.state.history.back > 0) {
      let newState = this.state;
      let pieces = Object.assign({}, Pieces);
      newState.history.back -= 1;
      for (let i = 0; i < this.state.history.items.length - newState.history.back; i++) {
        delete pieces[this.state.history.items[i].move.from];
        pieces[this.state.history.items[i].move.to] = this.state.history.items[i].move.piece;
      }
      newState.pieces = pieces;
      this.setState(newState);
    }
  }

  goBeginning() {
    let newState = this.state;
    newState.history.back = this.state.history.items.length;
    newState.pieces = Object.assign({}, Pieces);
    this.setState(newState);
  }

  goEnd() {
    let newState = this.state;
    let pieces = Object.assign({}, Pieces);
    newState.history.back = 0;
    for (let i = 0; i < this.state.history.items.length; i++) {
      delete pieces[this.state.history.items[i].move.from];
      pieces[this.state.history.items[i].move.to] = this.state.history.items[i].move.piece;
    }
    newState.pieces = pieces;
    this.setState(newState);
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
        isPast={this.state.history.back > 0}
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
    this.state.history.items.forEach(function (item, index) {
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
          <div className={['board', this.state.history.back > 0 ? 'past' : 'present'].join(' ')}>
            {this.renderRows()}
          </div>
          <div className="controls">
            <button
              disabled={this.state.history.back >= this.state.history.items.length}
              onClick={() => this.goBeginning()}>&lt;&lt;
            </button>
            <button
              disabled={this.state.history.back >= this.state.history.items.length}
              onClick={() => this.goBack()}>&lt;
            </button>
            <button
              disabled={this.state.history.back === 0}
              onClick={() => this.goForward()}>&gt;
            </button>
            <button
              disabled={this.state.history.back === 0}
              onClick={() => this.goEnd()}>&gt;&gt;
            </button>
          </div>
        </div>
        <div className="history">
          {this.renderHistory()}
        </div>
      </div>
    );
  }
}
