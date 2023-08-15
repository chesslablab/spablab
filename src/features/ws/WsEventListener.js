import * as playMode from 'features/mode/playModeSlice';
import WsEvent from 'features/ws/WsEvent';

export default class WsEventListener {
  static listen = (props, data) => dispatch => {
    const mssg = Object.keys(data)[0];
    switch (true) {
      case 'broadcast' === mssg:
        dispatch(playMode.playOnlineTable(data['broadcast']['onlineGames']));
        break;
      case '/leave' === mssg:
        dispatch(WsEvent.onLeave(data));
        break;
      case '/takeback' === mssg:
        dispatch(WsEvent.onTakeback(data));
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
        dispatch(WsEvent.onRandomizer(data));
        break;
      case '/stockfish' === mssg:
        dispatch(WsEvent.onStockfish(data));
        break;
      case '/inbox' === mssg:
        dispatch(WsEvent.onInbox(data));
        break;
      case 'error' === mssg:
        dispatch(WsEvent.onError(data));
        break;
      default:
        break;
    }
  }
}
