import { Pgn } from '@chesslablab/reactblab';
import store, { getActiveMode } from 'app/store';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as modeConst from 'features/mode/modeConst';
import WsEventListener from 'socket/WsEventListener';

export default class Ws {
  static ws;

  static connect = () => dispatch => {
    dispatch(infoAlert.show({
      mssg: 'Establishing connection...',
      button: false
    }));
    return new Promise((resolve, reject) => {
      Ws.ws = new WebSocket(`${process.env.REACT_APP_WS_SCHEME}://${process.env.REACT_APP_WS_HOST}:${process.env.REACT_APP_WS_PORT}`);
      Ws.ws.onopen = () => {
        dispatch(infoAlert.close());
        resolve();
      };
      Ws.ws.onmessage = (res) => {
        dispatch(WsEventListener.listen(JSON.parse(res.data)));
      };
      Ws.ws.onclose = (err) => {
        dispatch(warningAlert.show({
          mssg: 'The connection has been lost, please reload the page.'
        }));
        reject(err);
      };
      Ws.ws.onerror = (err) => {
        dispatch(warningAlert.show({
          mssg: 'The connection has been lost, please reload the page.'
        }));
        reject(err);
      };
    });
  }

  static start = async (variant, mode, settings = {}) => {
    let mssg = `/start ${variant} ${mode}`;
    if (Object.keys(settings).length > 0) {
      if (mode === modeConst.FEN) {
        mssg += ` ${JSON.stringify(settings.settings)}`;
      } else if (mode === modeConst.SAN) {
        mssg += ` ${JSON.stringify(settings.settings)}`;
      } else if (mode === modeConst.PLAY) {
        mssg += ` ${JSON.stringify(settings.settings)}`;
      } else if (mode === modeConst.STOCKFISH) {
        if (settings.hasOwnProperty('color')) {
          mssg += ` ${settings.color}`;
        } else if (settings.hasOwnProperty('fen')) {
          mssg += ` "${settings.fen}"`;
        }
      }
    }

    return await Ws.ws.send(mssg);
  }

  static playLan = async (lan) => {
    const color = store.getState().board.turn === Pgn.symbol.WHITE
      ? Pgn.symbol.BLACK
      : Pgn.symbol.WHITE;

    if (lan) {
      return await Ws.ws.send(`/play_lan ${color} ${lan}`);
    }

    return await Ws.ws.send(`/play_lan ${color} ${store.getState().board.lan}`);
  }

  static accept = async (hash) => {
    return await Ws.ws.send(`/accept ${hash}`);
  }

  static legal = async (sq) => {
    return await Ws.ws.send(`/legal ${sq}`);
  }

  static heuristics = async () => {
    const fen = store.getState().board.fen[store.getState().board.fen.length - 1];
    const variant = getActiveMode().variant;

    if (store.getState().nav.dialogs.settings.fields.heuristics === 'on') {
      return await Ws.ws.send(`/heuristics "${fen}" ${variant}`);
    }
  }

  static takeback = async (action) => {
    return await Ws.ws.send(`/takeback ${action}`);
  }

  static draw = async (action) => {
    return await Ws.ws.send(`/draw ${action}`);
  }

  static undo = async () => {
    return await Ws.ws.send(`/undo`);
  }

  static resign = async (action) => {
    return await Ws.ws.send(`/resign ${action}`);
  }

  static rematch = async (action) => {
    return await Ws.ws.send(`/rematch ${action}`);
  }

  static restart = async () => {
    return await Ws.ws.send(`/restart ${store.getState().playMode.play.hash}`);
  }

  static randomizer = async (color, items) => {
    items = JSON.stringify(items).replace(/"/g, '\\"');

    return await Ws.ws.send(`/randomizer ${color} "${items}"`);
  }

  static stockfish = async () => {
    const options = JSON.stringify(store.getState().stockfishMode.computer.options).replace(/"/g, '\\"');
    const params = JSON.stringify(store.getState().stockfishMode.computer.params).replace(/"/g, '\\"');

    return await Ws.ws.send(`/stockfish "${options}" "${params}"`);
  }

  static stockfishEval = async () => {
    const fen = store.getState().board.fen[store.getState().board.fen.length - 1];
    const variant = getActiveMode().variant;

    if (store.getState().nav.dialogs.settings.fields.eval === 'on') {
      return await Ws.ws.send(`/stockfish_eval "${fen}" ${variant}`);
    }
  }

  static tutorFen = async () => {
    const fen = store.getState().board.fen[store.getState().board.fen.length - 1];
    const variant = getActiveMode().variant;

    if (store.getState().nav.dialogs.settings.fields.explanation === 'on') {
      return await Ws.ws.send(`/tutor_fen "${fen}" ${variant}`);
    }
  }

  static onlineGames = async () => {
    return await Ws.ws.send('/online_games');
  }
}
