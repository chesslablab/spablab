import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import { EventEmitter } from 'events';
import HistoryStore from '../stores/HistoryStore.js';
import ServerStore from '../stores/ServerStore.js';
import Pgn from '../utils/Pgn.js';
import Pieces from '../utils/Pieces.js';

class BoardStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			move: null,
			pieces: Object.assign({}, Pieces)
		};
		AppDispatcher.register(this.handleActions.bind(this));
	}

	getState() {
		return this.state;
	}

	setMove(move) {
		this.state.move = move;
	}

	setPieces(pieces) {
		this.state.pieces = pieces;
	}

	reset() {
		this.state = {
			move: null,
			pieces: Object.assign({}, Pieces)
		};
		HistoryStore.reset();
		ServerStore.connect();

		this.emit("reset");
	}

  castle(pgn) {
    if (pgn === Pgn.symbol.CASTLING_SHORT) {
      if (this.state.move.piece.color === Pgn.symbol.WHITE) {
        delete this.state.pieces['h1'];
        this.state.pieces['f1'] = {
          color: Pgn.symbol.WHITE,
          unicode: '♖',
          symbol: Pgn.symbol.ROOK
        };
      } else {
        delete this.state.pieces['h8'];
        this.state.pieces['f8'] = {
          color: Pgn.symbol.BLACK,
          unicode: '♜',
          symbol: Pgn.symbol.ROOK
        };
      }
    } else if (pgn === Pgn.symbol.CASTLING_LONG) {
      if (this.state.move.piece.color === Pgn.symbol.WHITE) {
        delete this.state.pieces['a1'];
        this.state.pieces['d1'] = {
          color: Pgn.symbol.WHITE,
          unicode: '♖',
          symbol: Pgn.symbol.ROOK
        };
      } else {
        delete this.state.pieces['a8'];
        this.state.pieces['d8'] = {
          color: Pgn.symbol.BLACK,
          unicode: '♜',
          symbol: Pgn.symbol.ROOK
        };
      }
    }

    return this;
  }

  enPassant(pgn) {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    if (re.test(pgn)) {
      let square;
      if (this.state.move.piece.color === Pgn.symbol.WHITE && this.state.move.from.charAt(1) === '5') {
        square = this.state.move.to.charAt(0) + (parseInt(this.state.move.to.charAt(1),10) - 1);
      } else if (this.state.move.piece.color === Pgn.symbol.BLACK && this.state.move.from.charAt(1) === '4') {
        square = this.state.move.to.charAt(0) + (parseInt(this.state.move.to.charAt(1),10) + 1);
      }
      delete this.state.pieces[square];
    }

    return this;
  }

  promote(pgn) {
    if (this.state.move.piece.symbol === Pgn.symbol.PAWN) {
      if (this.state.move.piece.color === Pgn.symbol.WHITE && this.state.move.to.charAt(1) === '8') {
        delete this.state.pieces[this.state.move.to];
        this.state.pieces[this.state.move.to] = {
          color: Pgn.symbol.WHITE,
          unicode: '♕',
          symbol: Pgn.symbol.QUEEN
        };
      } else if(this.state.move.piece.color === Pgn.symbol.BLACK && this.state.move.to.charAt(1) === '1') {
        delete this.state.pieces[this.state.move.to];
        this.state.pieces[this.state.move.to] = {
          color: Pgn.symbol.BLACK,
          unicode: '♛',
          symbol: Pgn.symbol.QUEEN
        };
      }
    }

    return this;
  }

	normalMove(pgn, square) {
		delete this.state.pieces[this.state.move.from];
		this.state.move.to = square;
		this.state.pieces[this.state.move.to] = this.state.move.piece;

		return this;
	}

	specialMove(pgn) {
		this.castle(pgn).enPassant(pgn).promote(pgn);
	}

	move(pgn, square) {
		this.normalMove(pgn, square).specialMove(pgn);
	}

	handleActions(action) {
		switch (action.type) {
			case ActionTypes.RESET_BOARD:
				this.reset();
				break;
			default:
        // do nothing
		}
	}
}

export default new BoardStore();
