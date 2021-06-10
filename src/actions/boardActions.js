import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import { playfen } from '../actions/serverActions';

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

export const click = (ws, payload) => dispatch => {
  dispatch({
    type: boardActionTypes.CLICK,
    payload: payload
  });
  dispatch(playfen(ws, payload.fen)).then((data) => {
    // TODO:
    // check if valid move
  }).catch(e => {});
};
