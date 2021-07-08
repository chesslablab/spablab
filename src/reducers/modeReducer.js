import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';

const initialState = {
  current: modeNames.ANALYSIS,
  playfriend: {
    jwt: null,
    hash: null,
    created_code: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case modeActionTypes.RESET:
      return initialState;
    case modeActionTypes.SET:
      return {
        ...state,
        current: action.payload.current,
        playfriend: action.payload.playfriend
      };
    default:
      return state;
  }
};

export default reducer;
