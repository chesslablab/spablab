import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import Wording from '../utils/Wording.js';
import Pgn from '../utils/Pgn';

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
    rematch: null,
    accepted: false,
    timer: {
      expiry_timestamp: null,
      over: null
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
        playfriend: {
          ...state.playfriend,
          ...action.payload.playfriend
        }
      };
    case modeActionTypes.ACCEPT_PLAYFRIEND:
      const expiryTimestamp = new Date();
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(state.playfriend.jwt_decoded.min) * 60);
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          accepted: true,
          timer: {
            ...state.playfriend.timer,
            expiry_timestamp: expiryTimestamp
          }
        }
      };
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
    case modeActionTypes.TIMER_OVER:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          timer: {
            ...state.playfriend.timer,
            over: action.payload.color
          }
        }
      };
    case modeActionTypes.REMATCH_ACCEPT:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          rematch: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.REMATCH_DECLINE:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          rematch: null
        }
      };
    case modeActionTypes.REMATCH_PROPOSE:
      return {
        ...state,
        playfriend: {
          ...state.playfriend,
          rematch: Wording.verb.PROPOSE.toLowerCase()
        }
      };
    default:
      return state;
  }
};

export default reducer;
