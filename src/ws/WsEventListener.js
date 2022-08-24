import store from '../app/store';
import Wording from '../common/Wording.js';
import { playMove } from '../features/boardSlice';
import {
  MODE_ANALYSIS,
  MODE_GM,
  MODE_FEN,
  MODE_PGN,
  MODE_PLAY,
  MODE_STOCKFISH
} from '../features/modeConstants';
import { closeProgressDialog } from '../features/dialog/progressDialogSlice';
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
        dispatch(closeProgressDialog());
        if (data['/start'].mode === MODE_ANALYSIS) {
          dispatch(WsEvent.onStartAnalysis(data));
        } else if (data['/start'].mode === MODE_GM) {
          dispatch(WsEvent.onStartGm(data));
        } else if (data['/start'].mode === MODE_FEN) {
          dispatch(WsEvent.onStartFen(data));
        } else if (data['/start'].mode === MODE_PGN) {
          dispatch(WsEvent.onStartPgn(data));
        } else if (data['/start'].mode === MODE_PLAY) {
          dispatch(WsEvent.onStartPlay(data));
        } else if (data['/start'].mode === MODE_STOCKFISH) {
          if (data['/start'].fen) {
            dispatch(WsEvent.onStartStockfishByFen(data));
          } else {
            dispatch(WsEvent.onStartStockfishByColor(data));
          }
        }
        break;
      case '/accept' === cmd:
        dispatch(WsEvent.onAccept(data));
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
        dispatch(WsEvent.onLegalSqs(data));
        break;
      case '/heuristics' === cmd:
        dispatch(closeProgressDialog());
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
      case '/gm' === cmd:
        dispatch(closeProgressDialog());
        dispatch(WsEvent.onGm(data));
        break;
      case '/random_checkmate' === cmd:
        dispatch(closeProgressDialog());
        dispatch(WsEvent.onRandomCheckmate(data));
        break;
      case '/random_game' === cmd:
        dispatch(closeProgressDialog());
        dispatch(WsEvent.onRandomGame(data));
        break;
      case '/stockfish' === cmd:
        dispatch(closeProgressDialog());
        dispatch(WsEvent.onStockfish(data));
        break;
      case 'validate' === cmd:
        dispatch(closeProgressDialog());
        dispatch(WsEvent.onValidate(data));
        break;
      default:
        break;
    }
  }
}
