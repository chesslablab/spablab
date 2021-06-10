import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import { castling, playfen } from '../actions/serverActions';

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
  dispatch(castling(ws)).then((data) => {
    const castling = JSON.parse(data);
    // TODO:
    // Append castling rights to payload.fen
    dispatch(playfen(ws, payload.fen)).then((data) => {
      // TODO:
      // Check if the move is a valid one
    });
  }).catch(e => {});
};
