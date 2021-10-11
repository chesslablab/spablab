import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';

const initialState = {
  current: modeNames.ANALYSIS,
  playfriend: {
    jwt: null,
    jwt_decoded: null,
    hash: null,
    color: null,
    takeback: null,
    draw: null,
    accepted: false,
    timer: {
      start: null,
      w: null,
      b: null
    }
  }
};

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, initialState);
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
      newState.current = state.current;
      return newState;
    // TODO:
    // Use constant names for draw actions
    case modeActionTypes.TAKEBACK_ACCEPT:
      newState.playfriend.takeback = 'accept';
      return newState;
    case modeActionTypes.TAKEBACK_DECLINE:
      newState.playfriend.draw = null;
      return newState;
    case modeActionTypes.TAKEBACK_PROPOSE:
      newState.playfriend.takeback = 'propose';
      return newState;
    // TODO:
    // Use constant names for draw actions
    case modeActionTypes.DRAW_ACCEPT:
      newState.playfriend.draw = 'accept';
      return newState;
    case modeActionTypes.DRAW_DECLINE:
      newState.playfriend.draw = null;
      return newState;
    case modeActionTypes.DRAW_PROPOSE:
      newState.playfriend.draw = 'propose';
      return newState;
    default:
      return state;
  }
};

export default reducer;
