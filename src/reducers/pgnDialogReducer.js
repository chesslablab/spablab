import pgnDialogActionTypes from '../constants/pgnDialogActionTypes';

const initialState = {
  open: false,
  pgn: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case pgnDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case pgnDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    case pgnDialogActionTypes.SET:
      return {
        ...state,
        pgn: action.payload.pgn,
      };
    default:
      return state;
  }
};

export default reducer;
