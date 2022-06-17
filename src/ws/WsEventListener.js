import store from '../app/store';
import Wording from '../common/Wording.js';
import { showInfoAlert } from '../features/alert/infoAlertSlice';
import { playMove } from '../features/boardSlice';
import {
  MODE_ANALYSIS,
  MODE_GM,
  MODE_LOADFEN,
  MODE_LOADPGN,
  MODE_PLAY
} from '../features/modeConstants';
import WsAction from './WsAction';
import WsEvent from './WsEvent';

export default class WsEventListener {
  static listen = (props, data) => dispatch => {
    const cmd = Object.keys(data)[0];
    switch (true) {
      case '/leave' === cmd:
        if (data['/leave'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onLeaveAccept());
        }
        break;
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
        if (data['/start'].mode === MODE_ANALYSIS) {
          dispatch(WsEvent.onStartAnalysis(data));
        } else if (data['/start'].mode === MODE_GM) {
          dispatch(WsEvent.onStartGrandmaster(data));
        } else if (data['/start'].mode === MODE_LOADFEN) {
          dispatch(WsEvent.onStartLoadfen(data));
        } else if (data['/start'].mode === MODE_LOADPGN) {
          dispatch(WsEvent.onStartLoadpgn(data));
        } else if (data['/start'].mode === MODE_PLAY) {
          dispatch(WsEvent.onStartPlay(data));
        }
        break;
      case '/accept' === cmd:
        if (data['/accept'].jwt) {
          dispatch(WsEvent.onAccept(data));
        } else {
          dispatch(showInfoAlert({ info: 'Invalid invite code.' }));
        }
        break;
      case '/online_games' === cmd:
        dispatch(WsEvent.onOnlineGames(data));
        break;
      case '/play_fen' === cmd:
        if (store.getState().mode.name === MODE_PLAY) {
          if (store.getState().mode.play.color !== data['/play_fen'].turn) {
            dispatch(playMove({ fen: data['/play_fen'].fen }));
          }
        }
        dispatch(WsEvent.onPlayfen(props, data));
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
      case '/undo' === cmd:
        dispatch(WsEvent.onUndo(data));
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
      case '/grandmaster' === cmd:
        dispatch(WsEvent.onGrandmaster(data));
        break;
      case '/random_game' === cmd:
        if (data['/random_game'].mode === MODE_LOADPGN) {
          dispatch(WsEvent.onRandomGame(data));
        }
        break;
      default:
        break;
    }
  }
}
