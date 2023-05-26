import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import * as progressDialog from 'features/progressDialogSlice';
import WsEvent from 'features/ws/WsEvent';

export default class WsEventListener {
  static listen = (props, data) => dispatch => {
    const mssg = Object.keys(data)[0];
    switch (true) {
      case 'broadcast' === mssg:
        dispatch(playMode.playOnlineDialog({ rows: data['broadcast']['onlineGames'] }));
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
        dispatch(WsEvent.onDraw(data));
        break;
      case '/start' === mssg:
        dispatch(WsEvent.onStart(data));
        break;
      case '/accept' === mssg:
        dispatch(WsEvent.onAccept(data));
        break;
      case '/play_lan' === mssg:
        dispatch(WsEvent.onPlayLan(props, data));
        break;
      case '/legal' === mssg:
        dispatch(WsEvent.onLegal(data));
        break;
      case '/heuristics' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onHeuristics(data));
        break;
      case '/heuristics_bar' === mssg:
        dispatch(WsEvent.onHeuristicsBar(data));
        break;
      case '/online_games' === mssg:
        dispatch(WsEvent.onOnlineGames(data));
        break;
      case '/undo' === mssg:
        dispatch(WsEvent.onUndo(data));
        break;
      case '/resign' === mssg:
        dispatch(WsEvent.onResign(data));
        break;
      case '/rematch' === mssg:
        dispatch(WsEvent.onRematch(data));
        break;
      case '/restart' === mssg:
        dispatch(WsEvent.onRestart(data));
        break;
      case '/randomizer' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onRandomizer(data));
        break;
      case '/stockfish' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onStockfish(data));
        break;
      case '/inbox' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onCorrespondence(data));
        break;
      case 'error' === mssg:
        dispatch(progressDialog.close());
        dispatch(WsEvent.onError(data));
        break;
      default:
        break;
    }
  }
}
