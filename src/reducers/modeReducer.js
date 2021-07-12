import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';

const initialState = {
  current: modeNames.ANALYSIS,
  playfriend: {
    jwt: null,
    jwt_decoded: null,
    hash: null,
    color: null,
    accepted: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case modeActionTypes.RESET:
      return initialState;
    case modeActionTypes.SET_PLAYFRIEND:
      return {
        ...state,
        current: action.payload.current,
        playfriend: action.payload.playfriend
      };
    case modeActionTypes.ACCEPT_PLAYFRIEND:
      let newPlayfriend = Object.assign({}, state.playfriend);
      newPlayfriend.accepted = true;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    default:
      return state;
  }
};

export default reducer;
