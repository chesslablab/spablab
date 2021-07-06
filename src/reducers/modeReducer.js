import modeActionTypes from '../constants/modeActionTypes';
import Pgn from '../utils/Pgn';

const initialState = {
  name: 'analysis',
  color: Pgn.symbol.WHITE,
  time: null,
  created_code: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case modeActionTypes.RESET:
      return initialState;
    case modeActionTypes.SET:
      return {
        ...state,
        name: action.payload.name,
        color: action.payload.color,
        time: action.payload.time,
        created_code: action.payload.created_code
      };
    default:
      return state;
  }
};

export default reducer;
