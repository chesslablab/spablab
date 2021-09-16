import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';

const initialState = {
  current: modeNames.ANALYSIS,
  playfriend: {
    jwt: null,
    jwt_decoded: null,
    hash: null,
    color: null,
    accepted: false,
    timer: {
      start: null,
      w: null,
      b: null
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case modeActionTypes.SET_ANALYSIS:
      return initialState;
    case modeActionTypes.SET_LOADFEN:
      return {
        ...initialState,
        current: modeNames.LOADFEN
      };
    case modeActionTypes.SET_PLAYFRIEND:
      return {
        ...state,
        current: action.payload.current,
        playfriend: action.payload.playfriend
      };
    case modeActionTypes.ACCEPT_PLAYFRIEND:
      let newPlayfriend = Object.assign({}, state.playfriend);
      const time = new Date();
      time.setSeconds(time.getSeconds() + parseInt(newPlayfriend.jwt_decoded.min) * 60);
      newPlayfriend.accepted = true;
      newPlayfriend.timer = {
        start: time,
        w: time,
        b: time
      };
      return {
        ...state,
        playfriend: newPlayfriend
      };
    case modeActionTypes.CHECKMATE:
      let newState = Object.assign({}, initialState);
      newState.current = state.current;
      return newState;
    default:
      return state;
  }
};

export default reducer;
