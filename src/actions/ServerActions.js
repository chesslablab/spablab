import AppDispatcher from "../dispatcher/AppDispatcher.js";
import ActionTypes from "../constants/AppConstants.js";

class ServerActions {
	reset() {
		AppDispatcher.dispatch({
			type: ActionTypes.CONNECT_SERVER
		});
	}
}

export default new ServerActions();
