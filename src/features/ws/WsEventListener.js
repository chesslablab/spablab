import store from '../../app/store';
import Wording from '../../common/Wording.js';
import * as board from '../../features/board/boardSlice';
import * as playOnlineDialog from '../../features/dialog/playOnlineDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as modeConst from '../../features/mode/modeConst';
import WsEvent from '../../features/ws/WsEvent';

export default class WsEventListener {
  static listen = (props, data) => dispatch => {
    const mssg = Object.keys(data)[0];
    switch (true) {
      case 'broadcast' === mssg:
        dispatch(playOnlineDialog.refresh(data['broadcast']['onlineGames']));
        break;
      case '/leave' === mssg:
        if (data['/leave'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onLeaveAccept());
        }
        break;
      case '/takeback' === mssg:
        if (data['/takeback'] === Wording.verb.PROPOSE.toLowerCase()) {
          dispatch(WsEvent.onTakebackPropose());
        } else if (data['/takeback'] ===  Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onTakebackAccept());
        }
        break;
      case '/draw' === mssg:
        if (data['/draw'] === Wording.verb.PROPOSE.toLowerCase()) {
          dispatch(WsEvent.onDrawPropose());
        } else if (data['/draw'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onDrawAccept());
        } else if (data['/draw'] === Wording.verb.DECLINE.toLowerCase()) {
          dispatch(WsEvent.onDrawDecline());
        }
        break;
      case '/start' === mssg:
        dispatch(WsEvent.onStart(data));
        break;
      case '/accept' === mssg:
        dispatch(WsEvent.onAccept(data));
        break;
      case '/play_lan' === mssg:
        if (store.getState().mode.name === modeConst.PLAY) {
          if (store.getState().mode.play.color !== data['/play_lan'].turn) {
            dispatch(board.playMove({ fen: data['/play_lan'].fen }));
          }
        }
        dispatch(WsEvent.onPlayLan(props, data));
        break;
      case '/legal_sqs' === mssg:
        dispatch(WsEvent.onLegalSqs(data));
        break;
      case '/heuristics' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onHeuristics(data));
        break;
      case '/heuristics_bar' === mssg:
        dispatch(WsEvent.onHeuristicsBar(data));
        break;
      case '/undo' === mssg:
        dispatch(WsEvent.onUndo(data));
        break;
      case '/resign' === mssg:
        if (data['/resign'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onResignAccept());
        }
        break;
      case '/rematch' === mssg:
        if (data['/rematch'] === Wording.verb.PROPOSE.toLowerCase()) {
          dispatch(WsEvent.onRematchPropose());
        } else if (data['/rematch'] === Wording.verb.ACCEPT.toLowerCase()) {
          dispatch(WsEvent.onRematchAccept());
        } else if (data['/rematch'] === Wording.verb.DECLINE.toLowerCase()) {
          dispatch(WsEvent.onRematchDecline());
        }
        break;
      case '/restart' === mssg:
        dispatch(WsEvent.onRestart(data));
        break;
      case '/randomizer' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onRandomCheckmate(data));
        break;
      case '/stockfish' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onStockfish(data));
        break;
      case 'validate' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onValidate(data));
        break;
      default:
        break;
    }
  }
}
