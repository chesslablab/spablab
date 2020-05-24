import ActionTypes from 'constants/AppConstants';
import AppDispatcher from "dispatcher/AppDispatcher.js";
import BoardStore from "stores/BoardStore.js";
import HistoryStore from "stores/HistoryStore.js";
import ServerStore from "stores/ServerStore.js";
import { EventEmitter } from 'events';
import Pgn from 'utils/Pgn.js';

class SquareStore extends EventEmitter {
  constructor() {
    super();
    this.state = {};
    AppDispatcher.register(this.handleActions.bind(this));
  }

  getState() {
    return this.state;
  }

  click(square) {
    let piece = BoardStore.getState().pieces[square];
    switch (true) {
      // leave a piece on an empty square
      case BoardStore.getState().move !== null && piece === undefined:
        return this.move(
          Pgn.convert({
            piece: BoardStore.getState().move.piece,
            from: BoardStore.getState().move.from,
            to: square
          }),
          square
        );
      // leave a piece on a non-empty square
      case BoardStore.getState().move !== null && piece !== undefined:
        return this.move(
          Pgn.convert({
            piece: BoardStore.getState().move.piece,
            from: BoardStore.getState().move.from,
            to: square
          }, 'x'),
          square
        );
      // pick a piece on a non-empty squar
      case BoardStore.getState().move === null && piece !== undefined:
        let move = {
          piece: piece,
          from: square
        }
        BoardStore.setMove(move);
        return move;
      // pick a piece on an empty square
      default:
        return {};
    }
  }

  move(pgn, square) {
    let evEmitter = this;
    return new Promise((resolve, reject) => {
			ServerStore.getSocket().send(`${BoardStore.getState().move.piece.color} ${pgn}`);
			ServerStore.getSocket().onmessage = (ev) => {
        if (ev.data === 'true') {
          BoardStore.move(pgn, square);
          HistoryStore.add({
            pgn: pgn,
            move: BoardStore.getState().move
          });
        }
        BoardStore.setMove(null);
        evEmitter.emit("move");
				resolve(pgn);
			}
			ServerStore.getSocket().onerror = (err) => {
				evEmitter.emit("error");
				reject(err);
			}
		});
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

export default new SquareStore();
