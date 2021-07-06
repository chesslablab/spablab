import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import { wsMssgPlayfen } from '../actions/serverActions';

export const startBoard = (payload) => dispatch => {
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

export const pickPiece = (payload) => ({
  type: boardActionTypes.PICK_PIECE,
  payload: payload
});

export const leavePiece = (payload) => ({
  type: boardActionTypes.LEAVE_PIECE,
  payload: payload
});

export const flipBoard = () => dispatch => {
  dispatch({
    type: boardActionTypes.FLIP
  });
};
