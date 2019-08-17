import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import { EventEmitter } from 'events';

const url = 'ws://localhost:3001';

class ServerStore extends EventEmitter {
	getSocket() {
		return this.socket;
	}

	connect() {
		this.socket = new WebSocket(url);
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

const serverStore = new ServerStore();
AppDispatcher.register(serverStore.handleActions.bind(serverStore));

export default serverStore;
