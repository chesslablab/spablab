import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';

export const start = (payload) => dispatch => {
  dispatch({
    type: historyActionTypes.GO_TO_BEGINNING,
    payload: payload
  });
  dispatch({
    type: historyActionTypes.GO_TO_END
  });
  dispatch({
    type: boardActionTypes.START
  });
};

export const click = (payload) => dispatch => {
  dispatch({
    type: boardActionTypes.CLICK,
    payload: payload
  });
};
