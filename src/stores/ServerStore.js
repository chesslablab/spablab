import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import { EventEmitter } from 'events';

class ServerStore extends EventEmitter {
	constructor() {
		super();
		AppDispatcher.register(this.handleActions.bind(this));
	}

	getSocket() {
		return this.socket;
	}

	connect() {
		this.socket = new WebSocket(process.env.REACT_APP_PGN_CHESS_SERVER_URL);
		this.socket.onerror = function(ev) {
			alert('Whoops! The PGN Chess server is not running.');
		}
	}

	handleActions(action) {
		switch (action.type) {
			case ActionTypes.CONNECT_SERVER:
				this.connect();
				break;
			default:
				// do nothing
		}
	}
}

export default new ServerStore();
