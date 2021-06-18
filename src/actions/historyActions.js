import historyActionTypes from '../constants/historyActionTypes';
import boardActionTypes from '../constants/boardActionTypes';

export const goToBeginning = (payload) => dispatch => {
  dispatch({
    type: historyActionTypes.GO_TO_BEGINNING,
    payload: payload
  });
  dispatch({
    type: boardActionTypes.BROWSE_HISTORY
  });
};

export const goBack = () => dispatch => {
  dispatch({
    type: historyActionTypes.GO_BACK,
  });
  dispatch({
    type: boardActionTypes.BROWSE_HISTORY
  });
};

export const goForward = () => dispatch => {
  dispatch({
    type: historyActionTypes.GO_FORWARD,
  });
  dispatch({
    type: boardActionTypes.BROWSE_HISTORY
  });
};

export const goToEnd = () => dispatch => {
  dispatch({
    type: historyActionTypes.GO_TO_END,
  });
  dispatch({
    type: boardActionTypes.BROWSE_HISTORY
  });
};
