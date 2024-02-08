import * as playMode from 'features/mode/playModeSlice';
import WsEvent from 'socket/WsEvent';

export default class WsEventListener {
  static listen = (data) => dispatch => {
    const msg = Object.keys(data)[0];
    switch (true) {
      case 'broadcast' === msg:
        dispatch(playMode.playOnlineTable(data['broadcast']['onlineGames']));
        break;
      case '/leave' === msg:
        dispatch(WsEvent.onLeave(data));
        break;
      case '/takeback' === msg:
        dispatch(WsEvent.onTakeback(data));
        break;
      case '/draw' === msg:
        dispatch(WsEvent.onDraw(data));
        break;
      case '/start' === msg:
        dispatch(WsEvent.onStart(data));
        break;
      case '/accept' === msg:
        dispatch(WsEvent.onAccept(data));
        break;
      case '/play_lan' === msg:
        dispatch(WsEvent.onPlayLan(data));
        break;
      case '/legal' === msg:
        dispatch(WsEvent.onLegal(data));
        break;
      case '/heuristics' === msg:
        dispatch(WsEvent.onHeuristics(data));
        break;
      case '/online_games' === msg:
        dispatch(WsEvent.onOnlineGames(data));
        break;
      case '/undo' === msg:
        dispatch(WsEvent.onUndo(data));
        break;
      case '/resign' === msg:
        dispatch(WsEvent.onResign(data));
        break;
      case '/rematch' === msg:
        dispatch(WsEvent.onRematch(data));
        break;
      case '/restart' === msg:
        dispatch(WsEvent.onRestart(data));
        break;
      case '/randomizer' === msg:
        dispatch(WsEvent.onRandomizer(data));
        break;
      case '/stockfish' === msg:
        dispatch(WsEvent.onStockfish(data));
        break;
      case '/stockfish_eval' === msg:
        dispatch(WsEvent.onStockfishEval(data));
        break;
      case '/tutor_fen' === msg:
        dispatch(WsEvent.onTutorFen(data));
        break;
      case 'error' === msg:
        dispatch(WsEvent.onError(data));
        break;
      default:
        break;
    }
  }
}
