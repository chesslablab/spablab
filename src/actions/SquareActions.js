import AppDispatcher from "dispatcher/AppDispatcher.js";
import ActionTypes from "constants/AppConstants.js";

class SquareActions {
	click(square) {
		AppDispatcher.dispatch({
			type: ActionTypes.CLICK_SQUARE,
			square: square
		});
	}
}

export default new SquareActions();
