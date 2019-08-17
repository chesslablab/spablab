import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import { EventEmitter } from 'events';
import Pgn from '../utils/Pgn.js';

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

	setState(newState) {
		this.state = newState;
	}

	reset() {
		this.state = {
			back: 0,
			items: []
		};
	}

  goToBeginning() {
    this.state.back = this.state.items.length;
		this.emit("go_to_beginning");
  }

	goBack() {
		this.state.back += 1;
		this.emit("go_back");
	}

	goForward() {
		this.state.back -= 1;
		this.emit("go_forward");
	}

  goToEnd() {
		this.state.back = 0;
		this.emit("go_to_end");
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

	handleActions(action) {
		switch (action.type) {
			case ActionTypes.GO_TO_BEGINNING_HISTORY:
				this.goToBeginning();
				break;
			case ActionTypes.GO_BACK_HISTORY:
				this.goBack();
				break;
			case ActionTypes.GO_FORWARD_HISTORY:
				this.goForward();
				break;
			case ActionTypes.GO_TO_END_HISTORY:
				this.goToEnd();
				break;
			default:
				// do nothing
		}
	}
}

const historyStore = new HistoryStore();
AppDispatcher.register(historyStore.handleActions.bind(historyStore));

export default historyStore;
