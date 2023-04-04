import Pgn from '../../common/Pgn';
import * as modeConst from '../../features/mode/modeConst';
import * as variantConst from '../../features/variant/variantConst';
import WsEventListener from '../../features/ws/WsEventListener';
import * as wsSlice from '../../features/ws/wsSlice';

export default class WsAction {
  static connect = (state, props) => dispatch => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`${props.server.prot}://${props.server.host}:${props.server.port}`);
      ws.onmessage = (res) => {
        dispatch(WsEventListener.listen(props, JSON.parse(res.data)));
        resolve(res.data);
      };
      ws.onerror = (err) => {
        dispatch(wsSlice.connError());
        reject(err);
      };
      ws.onopen = () => {
        dispatch(wsSlice.connEstablished({ ws: ws }));
        resolve(ws);
      };
    });
  }

  static startOff = async (ws) => {
    return await ws.send('/start classical analysis');
  }

  static start = async (state, variant, mode, add = {}) => {
    let mssg = `/start ${variant} ${mode}`;
    if (Object.keys(add).length > 0) {
      if (mode === modeConst.GM) {
        mssg += ` "${add.color}"`;
      } else if (mode === modeConst.FEN && variant === variantConst.CLASSICAL) {
        mssg += ` "${add.fen}"`;
      } else if (mode === modeConst.FEN && variant === variantConst.CAPABLANCA_80) {
        mssg += ` "${add.fen}"`;
      } else if (mode === modeConst.FEN && variant === variantConst.CHESS_960) {
        mssg += ` "${add.fen}" ${add.startPos}`;
      } else if (mode === modeConst.PGN && variant === variantConst.CLASSICAL) {
        mssg += ` "${add.movetext}"`;
      } else if (mode === modeConst.PGN && variant === variantConst.CAPABLANCA_80) {
        mssg += ` "${add.movetext}"`;
      } else if (mode === modeConst.PGN && variant === variantConst.CHESS_960) {
        mssg += ` "${add.movetext}" ${add.startPos}`;
      } else if (mode === modeConst.PLAY) {
        mssg += ` ${JSON.stringify(add.settings)}`;
      } else if (mode === modeConst.STOCKFISH) {
        if (add.hasOwnProperty('color')) {
          mssg += ` ${add.color}`;
        } else if (add.hasOwnProperty('fen')) {
          mssg += ` "${add.fen}"`;
        }
      }
    }

    return await state.server.ws.send(mssg);
  }

  static onlineGames = async (state) => {
    return await state.server.ws.send('/online_games');
  }

  static playLan = async (state) => {
    const color = state.board.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    return await state.server.ws.send(`/play_lan ${color} ${state.board.lan}`);
  }

  static accept = async (state, hash) => {
    return await state.server.ws.send(`/accept ${hash}`);
  }

  static legalSqs = async (state, sq) => {
    return await state.server.ws.send(`/legal_sqs ${sq}`);
  }

  static heuristics = async (state, movetext) => {
    return await state.server.ws.send(`/heuristics "${movetext}"`);
  }

  static heuristicsBar = async (state, fen, variant) => {
    if (state.settingsDialog.fields.heuristics === 'on') {
      return await state.server.ws.send(`/heuristics_bar "${fen}" ${variant}`);
    }
  }

  static takeback = async (state, action) => {
    return await state.server.ws.send(`/takeback ${action}`);
  }

  static draw = async (state, action) => {
    return await state.server.ws.send(`/draw ${action}`);
  }

  static undo = async (state) => {
    return await state.server.ws.send(`/undo`);
  }

  static resign = async (state, action) => {
    return await state.server.ws.send(`/resign ${action}`);
  }

  static rematch = async (state, action) => {
    return await state.server.ws.send(`/rematch ${action}`);
  }

  static restart = async (state) => {
    return await state.server.ws.send(`/restart ${state.mode.play.hash}`);
  }

  static randomizer = async (state, color, items) => {
    items = JSON.stringify(items).replace(/"/g, '\\"');
    return await state.server.ws.send(`/randomizer ${color} "${items}"`);
  }

  static stockfish = async (state) => {
    const options = JSON.stringify(state.mode.computer.options).replace(/"/g, '\\"');
    const params = JSON.stringify(state.mode.computer.params).replace(/"/g, '\\"');

    return await state.server.ws.send(`/stockfish "${options}" "${params}"`);
  }
}
