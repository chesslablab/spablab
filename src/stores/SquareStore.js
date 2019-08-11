import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import BoardStore from "./BoardStore.js";
import HistoryStore from "./HistoryStore.js";
import { EventEmitter } from 'events';
import Pgn from '../utils/Pgn.js';

class SquareStore extends EventEmitter {
  click(square) {
    if (HistoryStore.getState().back > 0) {
      return false;
    }
    let piece = BoardStore.getState().pieces[square];
    let pgn = null;
    switch (true) {
      // leave a piece on an empty square
      case BoardStore.getState().move !== null && piece === undefined:
        pgn = Pgn.convert({
          piece: BoardStore.getState().move.piece,
          from: BoardStore.getState().move.from,
          to: square
        });
        if (this.props.server !== undefined) {
          this.move(pgn, square);
        }
        break;
      // leave a piece on a non-empty square
      case BoardStore.getState().move !== null && piece !== undefined:
        pgn = Pgn.convert({
          piece: BoardStore.getState().move.piece,
          from: BoardStore.getState().move.from,
          to: square
        }, 'x');
        if (this.props.server !== undefined) {
          this.move(pgn, square);
        }
        break;
      // pick a piece on a non-empty square
      case BoardStore.getState().move === null && piece !== undefined:
        let newState = BoardStore.getState();
        newState.move = {
          piece: piece,
          from: square
        };
        BoardStore.setState(newState);
        break;
      // pick a piece on an empty square
      default:
        break;
    }
  }

  move(pgn, square) {
    // let newState = BoardStore.getState();
    let newBoardState = BoardStore.getState();
    let newHistoryState = HistoryStore.getState();
    BoardStore.getSocket().send(BoardStore.getState().move.piece.color + ' ' + pgn);
    BoardStore.getSocket().onmessage = (function(ev) {
      if (ev.data === 'true') {
        delete newBoardState.pieces[BoardStore.getState().move.from];
        newBoardState.move.to = square;
        newBoardState.pieces[BoardStore.getState().move.to] = BoardStore.getState().move.piece;
        newHistoryState.items.push({
          pgn: pgn,
          move: newState.move
        });
        BoardStore.castle(pgn, newState)
					.enPassant(pgn, newState)
					.promote(pgn, newState);
        BoardStore.setState(newBoardState);
        HistoryStore.setState(newHistoryState);
        newBoardState = BoardStore.getState();
      }
      newBoardState.move = null;
      BoardStore.setState(newBoardState);
    }).bind(this);
  }

	handleActions(action) {
		switch (action.type) {
			case ActionTypes.CLICK_SQUARE:
				this.click(action.square);
				break;
			default:
        // do nothing
		}
	}
}

const squareStore = new SquareStore();
AppDispatcher.register(squareStore.handleActions.bind(squareStore));

export default squareStore;
