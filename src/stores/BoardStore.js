import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import { EventEmitter } from 'events';
import HistoryStore from '../stores/HistoryStore.js';
import Pgn from '../utils/Pgn.js';
import Pieces from '../utils/Pieces.js';

const url = 'ws://localhost:3001';

class BoardStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			move: null,
			pieces: Object.assign({}, Pieces)
		};
	}

	getState() {
		return this.state;
	}

	setState(newState) {
		this.state = newState;
	}

	getSocket() {
		return this.socket;
	}

	connect() {
		this.socket = new WebSocket(url);
		this.socket.onerror = function(ev) {
			alert('Whoops! The websocket server is not running.');
		}
	}

	reset() {
		this.state = {
			move: null,
			pieces: Object.assign({}, Pieces)
		};
		HistoryStore.reset();
		this.connect();

		this.emit("reset");
	}

  castle(pgn, newState) {
    if (pgn === Pgn.symbol.CASTLING_SHORT) {
      if (this.state.move.piece.color === Pgn.symbol.WHITE) {
        delete newState.pieces['h1'];
        newState.pieces['f1'] = {
          color: Pgn.symbol.WHITE,
          unicode: '♖',
          symbol: Pgn.symbol.ROOK
        };
      } else {
        delete newState.pieces['h8'];
        newState.pieces['f8'] = {
          color: Pgn.symbol.BLACK,
          unicode: '♜',
          symbol: Pgn.symbol.ROOK
        };
      }
    } else if (pgn === Pgn.symbol.CASTLING_LONG) {
      if (this.state.move.piece.color === Pgn.symbol.WHITE) {
        delete newState.pieces['a1'];
        newState.pieces['d1'] = {
          color: Pgn.symbol.WHITE,
          unicode: '♖',
          symbol: Pgn.symbol.ROOK
        };
      } else {
        delete newState.pieces['a8'];
        newState.pieces['d8'] = {
          color: Pgn.symbol.BLACK,
          unicode: '♜',
          symbol: Pgn.symbol.ROOK
        };
      }
    }

    return this;
  }

  enPassant(pgn, newState) {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    if (re.test(pgn)) {
      let square;
      if (this.state.move.piece.color === Pgn.symbol.WHITE && this.state.move.from.charAt(1) === '5') {
        square = this.state.move.to.charAt(0) + (parseInt(this.state.move.to.charAt(1),10) - 1);
      } else if (this.state.move.piece.color === Pgn.symbol.BLACK && this.state.move.from.charAt(1) === '4') {
        square = this.state.move.to.charAt(0) + (parseInt(this.state.move.to.charAt(1),10) + 1);
      }
      delete newState.pieces[square];
    }

    return this;
  }

  promote(pgn, newState) {
    if (this.state.move.piece.symbol === Pgn.symbol.PAWN) {
      if (this.state.move.piece.color === Pgn.symbol.WHITE && this.state.move.to.charAt(1) === '8') {
        delete newState.pieces[this.state.move.to];
        newState.pieces[this.state.move.to] = {
          color: Pgn.symbol.WHITE,
          unicode: '♕',
          symbol: Pgn.symbol.QUEEN
        };
      } else if(this.state.move.piece.color === Pgn.symbol.BLACK && this.state.move.to.charAt(1) === '1') {
        delete newState.pieces[this.state.move.to];
        newState.pieces[this.state.move.to] = {
          color: Pgn.symbol.BLACK,
          unicode: '♛',
          symbol: Pgn.symbol.QUEEN
        };
      }
    }

    return this;
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

const boardStore = new BoardStore();
AppDispatcher.register(boardStore.handleActions.bind(boardStore));

export default boardStore;
