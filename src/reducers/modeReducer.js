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
    resign: null,
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
  const newPlayfriend = Object.assign({}, state.playfriend);
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
      newPlayfriend.takeback = modeActionTypes.ACCEPT;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    case modeActionTypes.TAKEBACK_DECLINE:
      newPlayfriend.takeback = null;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    case modeActionTypes.TAKEBACK_PROPOSE:
      newPlayfriend.takeback = modeActionTypes.PROPOSE;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    // TODO:
    // Use constant names for draw actions
    case modeActionTypes.DRAW_ACCEPT:
      newPlayfriend.draw = modeActionTypes.ACCEPT;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    case modeActionTypes.DRAW_DECLINE:
      newPlayfriend.draw = null;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    case modeActionTypes.DRAW_PROPOSE:
      newPlayfriend.draw = modeActionTypes.PROPOSE;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    case modeActionTypes.RESIGN_ACCEPT:
      newPlayfriend.resign = modeActionTypes.ACCEPT;
      return {
        ...state,
        playfriend: newPlayfriend
      };
    default:
      return state;
  }
};

export default reducer;
