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

export const pick = (payload) => dispatch => {
  dispatch({
    type: boardActionTypes.PICK_PIECE,
    payload: payload
  });
};

export const leave = (payload) => dispatch => {
  dispatch({
    type: boardActionTypes.LEAVE_PIECE,
    payload: payload
  });
};

export const undo = () => ({
  type: boardActionTypes.UNDO
});

export const browseHistory = () => ({
  type: boardActionTypes.BROWSE_HISTORY
});
