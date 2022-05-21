import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import modeNames from '../constants/modeNames';
import store from '../store';
import Wording from '../utils/Wording.js';
import WsAction from '../ws/WsAction';
import WsEvent from '../ws/WsEvent';

export default class WsEventListener {
  static listen = (props, data) => dispatch => {
    const cmd = Object.keys(data)[0];
    switch (true) {
      case '/takeback' === cmd:
        if (data['/takeback'] === Wording.verb.PROPOSE.toLowerCase()) {
          dispatch(WsEvent.onTakebackPropose());
        } else if (data['/takeback'] ===  Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onTakebackAccept());
        }
        break;
      case '/draw' === cmd:
        if (data['/draw'] === Wording.verb.PROPOSE.toLowerCase()) {
          dispatch(WsEvent.onDrawPropose());
        } else if (data['/draw'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onDrawAccept());
        } else if (data['/draw'] === Wording.verb.DECLINE.toLowerCase()) {
          dispatch(WsEvent.onDrawDecline());
        }
        break;
      case '/start' === cmd:
        if (data['/start'].mode === modeNames.ANALYSIS) {
          dispatch(WsEvent.onStartAnalysis(data));
        } else if (data['/start'].mode === modeNames.GRANDMASTER) {
          dispatch(WsEvent.onStartGrandmaster(data));
        } else if (data['/start'].mode === modeNames.LOADFEN) {
          dispatch(WsEvent.onStartLoadfen(data));
        } else if (data['/start'].mode === modeNames.LOADPGN) {
          dispatch(WsEvent.onStartLoadpgn(data));
        } else if (data['/start'].mode === modeNames.PLAY) {
          dispatch(WsEvent.onStartPlay(data));
        }
        break;
      case '/accept' === cmd:
        if (data['/accept'].jwt) {
          dispatch(WsEvent.onAccept(data));
        } else {
          dispatch({
            type: infoAlertActionTypes.DISPLAY,
            payload: {
              info: 'Invalid invite code.'
            }
          });
        }
        break;
      case '/online_games' === cmd:
        dispatch(WsEvent.onOnlineGames(data));
        break;
      case '/play_fen' === cmd:
        if (store.getState().mode.current === modeNames.PLAY) {
          if (store.getState().mode.play.color !== data['/play_fen'].turn) {
            dispatch({
              type: boardActionTypes.PLAY_MOVE,
              payload: {
                fen: data['/play_fen'].fen
              }
            });
          }
        }
        dispatch(WsEvent.onPlayfen(props, data));
        if (store.getState().mode.current === modeNames.GRANDMASTER) {
          WsAction.response(store.getState());
        }
        break;
      case '/legal_sqs' === cmd:
        if (data['/legal_sqs']) {
          dispatch(WsEvent.onLegalSqs(data));
        }
        break;
      case '/heuristics' === cmd:
        dispatch(WsEvent.onHeuristics(data));
        break;
      case '/heuristics_bar' === cmd:
        dispatch(WsEvent.onHeuristicsBar(data));
        break;
      case '/undo_move' === cmd:
        dispatch(WsEvent.onUndoMove(data));
        break;
      case '/resign' === cmd:
        if (data['/resign'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onResignAccept());
        }
        break;
      case '/rematch' === cmd:
        if (data['/rematch'] === Wording.verb.PROPOSE.toLowerCase()) {
          dispatch(WsEvent.onRematchPropose());
        } else if (data['/rematch'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onRematchAccept());
        } else if (data['/rematch'] === Wording.verb.DECLINE.toLowerCase()) {
          dispatch(WsEvent.onRematchDecline());
        }
        break;
      case '/restart' === cmd:
        dispatch(WsEvent.onRestart(data));
        break;
      case '/response' === cmd:
        dispatch(WsEvent.onResponse(data));
        break;
      default:
        break;
    }
  }
}
