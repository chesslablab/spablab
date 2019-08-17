import AppDispatcher from "../dispatcher/AppDispatcher.js";
import ActionTypes from "../constants/AppConstants.js";

class HistoryActions {
	goToBeginning() {
		AppDispatcher.dispatch({
			type: ActionTypes.GO_TO_BEGINNING_HISTORY
		});
	}

	goBack() {
		AppDispatcher.dispatch({
			type: ActionTypes.GO_BACK_HISTORY
		});
	}

	goForward() {
		AppDispatcher.dispatch({
			type: ActionTypes.GO_FORWARD_HISTORY
		});
	}

	goToEnd() {
		AppDispatcher.dispatch({
			type: ActionTypes.GO_TO_END_HISTORY
		});
	}
}

export default new HistoryActions();
