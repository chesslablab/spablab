import ActionTypes from 'constants/AppConstants';
import AppDispatcher from "dispatcher/AppDispatcher.js";
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
		return new Promise((resolve, reject) => {
			this.socket = new WebSocket(process.env.REACT_APP_PGN_CHESS_SERVER_URL);
			this.socket.onopen = () => {
				this.emit("open");
				resolve(this.socket);
			}
			this.socket.onerror = (err) => {
				this.emit("error");
				reject(err);
			}
		});
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
