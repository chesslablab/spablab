import AppDispatcher from "../dispatcher/AppDispatcher.js";
import ActionTypes from "../constants/AppConstants.js";

class BoardActions {
	reset() {
		AppDispatcher.dispatch({
			type: ActionTypes.RESET_BOARD
		});
	}
}

export default new BoardActions();
