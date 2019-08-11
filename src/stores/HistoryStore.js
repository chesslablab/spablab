import { EventEmitter } from 'events';
import Pgn from '../utils/Pgn.js';
import Pieces from '../utils/Pieces.js';

class HistoryStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			back: 0,
			items: []
		};
	}

	getState() {
		return this.state;
	}

	goBack() {
    if (this.state.back < this.state.items.length) {
      let newState = this.state;
      let pieces = Object.assign({}, Pieces);
      newState.back += 1;
      for (let i = 0; i < this.state.items.length - newState.back; i++) {
        delete pieces[this.state.items[i].move.from];
        pieces[this.state.items[i].move.to] = this.state.items[i].move.piece;
        this.undoCastling(this.state.items[i], pieces);
        this.redoEnPassant(this.state.items[i], pieces);
      }
      newState.pieces = pieces;
      this.setState(newState);
    }
  }

  goForward() {
    if (this.state.back > 0) {
      let newState = this.state;
      let pieces = Object.assign({}, Pieces);
      newState.back -= 1;
      for (let i = 0; i < this.state.items.length - newState.back; i++) {
        delete pieces[this.state.items[i].move.from];
        pieces[this.state.items[i].move.to] = this.state.items[i].move.piece;
        this.undoCastling(this.state.items[i], pieces);
        this.redoEnPassant(this.state.items[i], pieces);
      }
      newState.pieces = pieces;
      this.setState(newState);
    }
  }

  goToBeginning() {
    let newState = this.state;
    newState.back = this.state.items.length;
    newState.pieces = Object.assign({}, Pieces);
    this.setState(newState);
  }

  goToEnd() {
    let newState = this.state;
    let pieces = Object.assign({}, Pieces);
    newState.back = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      delete pieces[this.state.items[i].move.from];
      pieces[this.state.items[i].move.to] = this.state.items[i].move.piece;
      this.undoCastling(this.state.items[i], pieces);
      this.redoEnPassant(this.state.items[i], pieces);
    }
    newState.pieces = pieces;
    this.setState(newState);
  }

  undoCastling(item, pieces) {
    if (item.pgn === Pgn.symbol.CASTLING_SHORT) {
      if (item.move.piece.color === Pgn.symbol.WHITE) {
        delete pieces['h1'];
        pieces['f1'] = {
          color: Pgn.symbol.WHITE,
          unicode: '♖',
          symbol: Pgn.symbol.ROOK
        };
      } else {
        delete pieces['h8'];
        pieces['f8'] = {
          color: Pgn.symbol.BLACK,
          unicode: '♜',
          symbol: Pgn.symbol.ROOK
        };
      }
    } else if (item.pgn === Pgn.symbol.CASTLING_LONG) {
      if (item.move.piece.color === Pgn.symbol.WHITE) {
        delete pieces['a1'];
        pieces['d1'] = {
          color: Pgn.symbol.WHITE,
          unicode: '♖',
          symbol: Pgn.symbol.ROOK
        };
      } else {
        delete pieces['a8'];
        pieces['d8'] = {
          color: Pgn.symbol.BLACK,
          unicode: '♜',
          symbol: Pgn.symbol.ROOK
        };
      }
    }
  }

  redoEnPassant(item, pieces) {
    let square;
    if (item.move.piece.color === Pgn.symbol.WHITE && item.move.from.charAt(1) === '5') {
      square = item.move.to.charAt(0) + (parseInt(item.move.to.charAt(1),10) - 1);
    } else if (item.move.piece.color === Pgn.symbol.BLACK && item.move.from.charAt(1) === '4') {
      square = item.move.to.charAt(0) + (parseInt(item.move.to.charAt(1),10) + 1);
    }
    delete pieces[square];
  }
}

export default new HistoryStore();
