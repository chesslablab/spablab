import store, { getActiveMode } from 'app/store';
import Pgn from 'common/Pgn';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import WsEventListener from 'features/ws/WsEventListener';
import * as wsSlice from 'features/ws/wsSlice';

export default class Ws {
  static connect = (props) => dispatch => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`${props.ws.prot}://${props.ws.host}:${props.ws.port}`);
      ws.onmessage = (res) => {
        dispatch(WsEventListener.listen(props, JSON.parse(res.data)));
      };
      ws.onerror = (err) => {
        dispatch(wsSlice.error());
        reject(err);
      };
      ws.onopen = () => {
        dispatch(wsSlice.established({ ws: ws }));
        resolve();
      };
    });
  }

  static start = async (variant, mode, settings = {}) => {
    let mssg = `/start ${variant} ${mode}`;
    if (Object.keys(settings).length > 0) {
      if (mode === modeConst.GM) {
        mssg += ` "${settings.color}"`;
      } else if (mode === modeConst.FEN && variant === variantConst.CLASSICAL) {
        mssg += ` "${settings.fen}"`;
      } else if (mode === modeConst.FEN && variant === variantConst.CAPABLANCA_80) {
        mssg += ` "${settings.fen}"`;
      } else if (mode === modeConst.FEN && variant === variantConst.CHESS_960) {
        mssg += ` "${settings.fen}" ${settings.startPos}`;
      } else if (mode === modeConst.PGN && variant === variantConst.CLASSICAL) {
        mssg += ` "${settings.movetext}"`;
      } else if (mode === modeConst.PGN && variant === variantConst.CAPABLANCA_80) {
        mssg += ` "${settings.movetext}"`;
      } else if (mode === modeConst.PGN && variant === variantConst.CHESS_960) {
        mssg += ` "${settings.movetext}" ${settings.startPos}`;
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

    return await store.getState().ws.ws.send(mssg);
  }

  static playLan = async () => {
    const color = store.getState().board.turn === Pgn.symbol.WHITE
      ? Pgn.symbol.BLACK
      : Pgn.symbol.WHITE;

    return await store.getState().ws.ws.send(`/play_lan ${color} ${store.getState().board.lan}`);
  }

  static accept = async (hash) => {
    return await store.getState().ws.ws.send(`/accept ${hash}`);
  }

  static legal = async (sq) => {
    return await store.getState().ws.ws.send(`/legal ${sq}`);
  }

  static heuristics = async (movetext) => {
    return await store.getState().ws.ws.send(`/heuristics "${movetext}"`);
  }

  static heuristicsBar = async () => {
    const fen = store.getState().board.fen[store.getState().board.fen.length - 1];
    const variant = getActiveMode().variant;

    if (store.getState().nav.dialogs.settings.fields.heuristics === 'on') {
      return await store.getState().ws.ws.send(`/heuristics_bar "${fen}" ${variant}`);
    }
  }

  static takeback = async (action) => {
    return await store.getState().ws.ws.send(`/takeback ${action}`);
  }

  static draw = async (action) => {
    return await store.getState().ws.ws.send(`/draw ${action}`);
  }

  static undo = async () => {
    return await store.getState().ws.ws.send(`/undo`);
  }

  static resign = async (action) => {
    return await store.getState().ws.ws.send(`/resign ${action}`);
  }

  static rematch = async (action) => {
    return await store.getState().ws.ws.send(`/rematch ${action}`);
  }

  static restart = async () => {
    return await store.getState().ws.ws.send(`/restart ${store.getState().playMode.play.hash}`);
  }

  static randomizer = async (color, items) => {
    items = JSON.stringify(items).replace(/"/g, '\\"');

    return await store.getState().ws.ws.send(`/randomizer ${color} "${items}"`);
  }

  static stockfish = async () => {
    const options = JSON.stringify(store.getState().stockfishMode.computer.options).replace(/"/g, '\\"');
    const params = JSON.stringify(store.getState().stockfishMode.computer.params).replace(/"/g, '\\"');

    return await store.getState().ws.ws.send(`/stockfish "${options}" "${params}"`);
  }

  static onlineGames = async () => {
    return await store.getState().ws.ws.send('/online_games');
  }

  static inboxCreate = async (variant, settings) => {
    return await store.getState().ws.ws.send(`/inbox create ${variant} ${JSON.stringify(settings)}`);
  }

  static inboxRead = async (hash) => {
    return await store.getState().ws.ws.send(`/inbox read ${hash}`);
  }

  static inboxReply = async (hash, pgn) => {
    return await store.getState().ws.ws.send(`/inbox reply ${hash} "${pgn}"`);
  }
}
