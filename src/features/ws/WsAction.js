import store from 'app/store';
import Pgn from 'common/Pgn';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/variant/variantConst';
import WsEventListener from 'features/ws/WsEventListener';
import * as wsSlice from 'features/ws/wsSlice';

export default class WsAction {
  static connect = (props) => dispatch => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`${props.server.prot}://${props.server.host}:${props.server.port}`);
      ws.onmessage = (res) => {
        dispatch(WsEventListener.listen(props, JSON.parse(res.data)));
      };
      ws.onerror = (err) => {
        dispatch(wsSlice.connError());
        reject(err);
      };
      ws.onopen = () => {
        dispatch(wsSlice.connEstablished({ ws: ws }));
        resolve();
      };
    });
  }

  static startOff = async () => {
    return await store.getState().server.ws.send('/start classical analysis');
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

    return await store.getState().server.ws.send(mssg);
  }

  static playLan = async () => {
    const color = store.getState().board.turn === Pgn.symbol.WHITE
      ? Pgn.symbol.BLACK
      : Pgn.symbol.WHITE;

    return await store.getState().server.ws.send(`/play_lan ${color} ${store.getState().board.lan}`);
  }

  static accept = async (hash) => {
    return await store.getState().server.ws.send(`/accept ${hash}`);
  }

  static legal = async (sq) => {
    return await store.getState().server.ws.send(`/legal ${sq}`);
  }

  static heuristics = async (movetext) => {
    return await store.getState().server.ws.send(`/heuristics "${movetext}"`);
  }

  static heuristicsBar = async () => {
    const fen = store.getState().board.fen[store.getState().board.fen.length - 1];
    const variant = store.getState().variant.name;

    if (store.getState().settingsDialog.fields.heuristics === 'on') {
      return await store.getState().server.ws.send(`/heuristics_bar "${fen}" ${variant}`);
    }
  }

  static takeback = async (action) => {
    return await store.getState().server.ws.send(`/takeback ${action}`);
  }

  static draw = async (action) => {
    return await store.getState().server.ws.send(`/draw ${action}`);
  }

  static undo = async () => {
    return await store.getState().server.ws.send(`/undo`);
  }

  static resign = async (action) => {
    return await store.getState().server.ws.send(`/resign ${action}`);
  }

  static rematch = async (action) => {
    return await store.getState().server.ws.send(`/rematch ${action}`);
  }

  static restart = async () => {
    return await store.getState().server.ws.send(`/restart ${store.getState().mode.play.hash}`);
  }

  static randomizer = async (color, items) => {
    items = JSON.stringify(items).replace(/"/g, '\\"');

    return await store.getState().server.ws.send(`/randomizer ${color} "${items}"`);
  }

  static stockfish = async () => {
    const options = JSON.stringify(store.getState().mode.computer.options).replace(/"/g, '\\"');
    const params = JSON.stringify(store.getState().mode.computer.params).replace(/"/g, '\\"');

    return await store.getState().server.ws.send(`/stockfish "${options}" "${params}"`);
  }

  static onlineGames = async () => {
    return await store.getState().server.ws.send('/online_games');
  }

  static correspCreate = async (variant, settings) => {
    return await store.getState().server.ws.send(`/corresp create ${variant} ${JSON.stringify(settings)}`);
  }

  static correspRead = async (hash) => {
    return await store.getState().server.ws.send(`/corresp read ${hash}`);
  }

  static correspReply = async (hash, pgn) => {
    return await store.getState().server.ws.send(`/corresp reply ${hash} "${pgn}"`);
  }
}
