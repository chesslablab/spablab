import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import Wording from '../utils/Wording.js';

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
      time.setSeconds(time.getSeconds() + parseInt(state.playfriend.jwt_decoded.min) * 60);
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          accepted: true,
          timer: {
            start: time,
            w: time,
            b: time
          }
        }
      };
    case modeActionTypes.RESET:
      return initialState;
    case modeActionTypes.TAKEBACK_ACCEPT:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          takeback: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.TAKEBACK_DECLINE:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          takeback: null
        }
      };
    case modeActionTypes.TAKEBACK_PROPOSE:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          takeback: Wording.verb.PROPOSE.toLowerCase()
        }
      };
    case modeActionTypes.DRAW_ACCEPT:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          draw: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.DRAW_DECLINE:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          draw: null
        }
      };
    case modeActionTypes.DRAW_PROPOSE:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          draw: Wording.verb.PROPOSE.toLowerCase()
        }
      };
    case modeActionTypes.RESIGN_ACCEPT:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          resign: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    default:
      return state;
  }
};

export default reducer;
