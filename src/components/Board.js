import Pgn from '../Pgn.js';
import Pieces from '../Pieces.js';
import React from 'react';
import Square from './Square.js';
import Symbol from '../Symbol.js';

/*
 * Board class.
 *
 * @author [Jordi Bassagañas](https://github.com/programarivm)
 */
export default class Board extends React.Component {
  /**
   * Constructor.
   */
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

  /**
   * Connection to the WebSocket server.
   */
  connect() {
      this.socket = new WebSocket('ws://' + this.props.server);
      this.socket.onerror = function(ev) {
        alert('Whoops! The websocket server is not running.');
      }
  }

  /**
   * Resets the board.
   */
  reset() {
    let newState = {
      history: {
        back: 0,
        items: []
      },
      move: null,
      pieces: Object.assign({}, Pieces)
    };
    this.setState(newState);
  }

  /**
   * Switches the color from w to b and viceversa.
   */
  switchColor(color) {
    return color === Symbol.BLACK ? Symbol.WHITE : Symbol.BLACK;
  }

  /**
   * Validates pgn moves on the server side, updating the state accordingly
   * (making the piece move).
   *
   * @param {string} pgn
   * @param {string} square
   */
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
        this.castle(pgn, newState); // moves the rook too if pgn is either O-O or O-O-O
        this.enPassant(pgn, newState); // removes the captured pawn if pgn is en passant
        this.setState(newState);
        newState = this.state;
      }
      newState.move = null;
      this.setState(newState);
    }).bind(this);
  }

  /**
   * Castling move.
   *
   * Moves the rook on the board too if pgn is either O-O or O-O-O.
   *
   * @param {string} pgn
   * @param {object} newState
   */
  castle(pgn, newState) {
    if (pgn === Symbol.CASTLING_SHORT) {
      if (this.state.move.piece.color === Symbol.WHITE) {
        delete newState.pieces['h1'];
        newState.pieces['f1'] = {
          color: Symbol.WHITE,
          unicode: '♖',
          symbol: Symbol.ROOK
        };
      } else {
        delete newState.pieces['h8'];
        newState.pieces['f8'] = {
          color: Symbol.BLACK,
          unicode: '♜',
          symbol: Symbol.ROOK
        };
      }
    } else if (pgn === Symbol.CASTLING_LONG) {
      if (this.state.move.piece.color === Symbol.WHITE) {
        delete newState.pieces['a1'];
        newState.pieces['d1'] = {
          color: Symbol.WHITE,
          unicode: '♖',
          symbol: Symbol.ROOK
        };
      } else {
        delete newState.pieces['a8'];
        newState.pieces['d8'] = {
          color: Symbol.BLACK,
          unicode: '♜',
          symbol: Symbol.ROOK
        };
      }
    }
  }

  /**
   * En passant move.
   *
   * Removes the captured pawn from the board if pgn is en passant.
   *
   * @param {pgn} string
   * @param {object} newState
   */
  enPassant(pgn, newState) {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    if (re.test(pgn)) {
      let square;
      if (this.state.move.piece.color === Symbol.WHITE) {
        square = this.state.move.to.charAt(0) + (parseInt(this.state.move.to.charAt(1),10) - 1);
      } else {
        square = this.state.move.to.charAt(0) + (parseInt(this.state.move.to.charAt(1),10) + 1);
      }
      delete newState.pieces[square];
    }
  }

  /**
   * Makes a piece move.
   *
   * Generates a pseudo pgn move first (Pgn.convert) which is then validated on
   * the server side through the validateMove method.
   *
   * @param {string} square
   */
  move(square) {
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
        break;
    }
  }

  /**
   * Undoes a castling move because of browsing the history.
   *
   * @param {object} item
   * @param {array} pieces
   */
  undoCastlingBecauseBrowsing(item, pieces) {
    switch (item.pgn) {

      case Symbol.CASTLING_SHORT:
        switch (item.move.piece.color) {
          case Symbol.WHITE:
            delete pieces['h1'];
            pieces['f1'] = {
              color: Symbol.WHITE,
              unicode: '♖',
              symbol: Symbol.ROOK
            };
            break;
          default:
            delete pieces['h8'];
            pieces['f8'] = {
              color: Symbol.BLACK,
              unicode: '♜',
              symbol: Symbol.ROOK
            };
            break;
        }
      break;

      case Symbol.CASTLING_LONG:
        switch (item.move.piece.color) {
          case Symbol.WHITE:
            delete pieces['a1'];
            pieces['d1'] = {
              color: Symbol.WHITE,
              unicode: '♖',
              symbol: Symbol.ROOK
            };
            break;
          default:
            delete pieces['a8'];
            pieces['d8'] = {
              color: Symbol.BLACK,
              unicode: '♜',
              symbol: Symbol.ROOK
            };
            break;
        }
      break;

      default:
        break;
    }
  }

  /**
   * Browses the history one step back.
   */
  browseBack() {
    if (this.state.history.back < this.state.history.items.length) {
      let newState = this.state;
      let pieces = Object.assign({}, Pieces);
      newState.history.back += 1;
      for (let i = 0; i < this.state.history.items.length - newState.history.back; i++) {
        delete pieces[this.state.history.items[i].move.from];
        pieces[this.state.history.items[i].move.to] = this.state.history.items[i].move.piece;
        this.undoCastlingBecauseBrowsing(this.state.history.items[i], pieces);
      }
      newState.pieces = pieces;
      this.setState(newState);
    }
  }

  /**
   * Browses the history one step forward.
   */
  browseForward() {
    if (this.state.history.back > 0) {
      let newState = this.state;
      let pieces = Object.assign({}, Pieces);
      newState.history.back -= 1;
      for (let i = 0; i < this.state.history.items.length - newState.history.back; i++) {
        delete pieces[this.state.history.items[i].move.from];
        pieces[this.state.history.items[i].move.to] = this.state.history.items[i].move.piece;
        this.undoCastlingBecauseBrowsing(this.state.history.items[i], pieces);
      }
      newState.pieces = pieces;
      this.setState(newState);
    }
  }

  /**
   * Browses the history to the beginning of the game.
   */
  browseBeginning() {
    let newState = this.state;
    newState.history.back = this.state.history.items.length;
    newState.pieces = Object.assign({}, Pieces);
    this.setState(newState);
  }

  /**
   * Browses the history to the last move.
   */
  browseEnd() {
    let newState = this.state;
    let pieces = Object.assign({}, Pieces);
    newState.history.back = 0;
    for (let i = 0; i < this.state.history.items.length; i++) {
      delete pieces[this.state.history.items[i].move.from];
      pieces[this.state.history.items[i].move.to] = this.state.history.items[i].move.piece;
      this.undoCastlingBecauseBrowsing(this.state.history.items[i], pieces);
    }
    newState.pieces = pieces;
    this.setState(newState);
  }

  /**
   * Renders a row.
   *
   * @param {number} number
   */
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
        onClick={() => this.move(square)} />
      );
      color = this.switchColor(color);
    }

    return row;
  }

  /**
   * Renders all rows.
   */
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

  /**
   * Renders the history.
   */
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

  /**
   * Render method.
   */
  render() {
    return (
      <div>
        <div className="game">
          <div className="options">
            <button onClick={() => this.reset()}>New game</button>
          </div>
          <div className={['board', this.state.history.back > 0 ? 'past' : 'present'].join(' ')}>
            {this.renderRows()}
          </div>
          <div className="controls">
            <button
              disabled={this.state.history.back >= this.state.history.items.length}
              onClick={() => this.browseBeginning()}>&lt;&lt;
            </button>
            <button
              disabled={this.state.history.back >= this.state.history.items.length}
              onClick={() => this.browseBack()}>&lt;
            </button>
            <button
              disabled={this.state.history.back === 0}
              onClick={() => this.browseForward()}>&gt;
            </button>
            <button
              disabled={this.state.history.back === 0}
              onClick={() => this.browseEnd()}>&gt;&gt;
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
