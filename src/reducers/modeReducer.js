import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import Wording from '../utils/Wording.js';
import Pgn from '../utils/Pgn';

const initialState = {
  current: modeNames.ANALYSIS,
  grandmaster: {
    color: null
  },
  play: {
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
    case modeActionTypes.SET_GRANDMASTER:
      return {
        ...initialState,
        current: modeNames.GRANDMASTER,
        grandmaster: {
          color: action.payload.color
        }
      };
    case modeActionTypes.SET_LOADFEN:
      return {
        ...initialState,
        current: modeNames.LOADFEN
      };
    case modeActionTypes.SET_LOADPGN:
      return {
        ...initialState,
        current: modeNames.LOADPGN
      };
    case modeActionTypes.SET_PLAY:
      return {
        ...state,
        current: action.payload.current,
        play: {
          ...state.play,
          ...action.payload.play
        }
      };
    case modeActionTypes.ACCEPT_PLAY:
      const expiryTimestamp = new Date();
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(state.play.jwt_decoded.min) * 60);
      return {
        ...state,
        play: {
          ...state.play,
          accepted: true,
          timer: {
            ...state.play.timer,
            expiry_timestamp: expiryTimestamp
          }
        }
      };
    case modeActionTypes.TAKEBACK_ACCEPT:
      return {
        ...state,
        play: {
          ...state.play,
          takeback: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.TAKEBACK_DECLINE:
      return {
        ...state,
        play: {
          ...state.play,
          takeback: null
        }
      };
    case modeActionTypes.TAKEBACK_PROPOSE:
      return {
        ...state,
        play: {
          ...state.play,
          takeback: Wording.verb.PROPOSE.toLowerCase()
        }
      };
    case modeActionTypes.DRAW_ACCEPT:
      return {
        ...state,
        play: {
          ...state.play,
          draw: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.DRAW_DECLINE:
      return {
        ...state,
        play: {
          ...state.play,
          draw: null
        }
      };
    case modeActionTypes.DRAW_PROPOSE:
      return {
        ...state,
        play: {
          ...state.play,
          draw: Wording.verb.PROPOSE.toLowerCase()
        }
      };
    case modeActionTypes.RESIGN_ACCEPT:
      return {
        ...state,
        play: {
          ...state.play,
          resign: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.TIMER_OVER:
      return {
        ...state,
        play: {
          ...state.play,
          timer: {
            ...state.play.timer,
            over: action.payload.color
          }
        }
      };
    case modeActionTypes.REMATCH_ACCEPT:
      return {
        ...state,
        play: {
          ...state.play,
          rematch: Wording.verb.ACCEPT.toLowerCase()
        }
      };
    case modeActionTypes.REMATCH_DECLINE:
      return {
        ...state,
        play: {
          ...state.play,
          rematch: null
        }
      };
    case modeActionTypes.REMATCH_PROPOSE:
      return {
        ...state,
        play: {
          ...state.play,
          rematch: Wording.verb.PROPOSE.toLowerCase()
        }
      };
    default:
      return state;
  }
};

export default reducer;
