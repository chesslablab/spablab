import * as modeConst from '../features/mode/modeConst';
import * as wsSlice from '../features/wsSlice';
import WsEventListener from './WsEventListener';

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

  static startAnalysis = async (ws) => {
    return await ws.send('/start classical analysis');
  }

  static start = async (state, variant, mode, params = {}) => {
    let mssg = `/start ${variant} ${mode}`;
    if (Object.keys(params).length > 0) {
      if (mode === modeConst.GM) {
        mssg += ` "${params.color}"`;
      } else if (mode === modeConst.FEN) {
        mssg += ` "${params.fen}"`;
      } else if (mode === modeConst.PGN) {
        mssg += ` "${params.movetext}"`;
      } else if (mode === modeConst.PLAY) {
        mssg += ` ${JSON.stringify(params.settings)}`;
      } else if (mode === modeConst.STOCKFISH) {
        if (params.hasOwnProperty('color')) {
          mssg += ` ${params.color}`;
        } else if (params.hasOwnProperty('fen')) {
          mssg += ` "${params.fen}"`;
        }
      }
    }

    return await state.server.ws.send(mssg);
  }

  static onlineGames = async (state) => {
    return await state.server.ws.send('/online_games');
  }

  static playFen = async (state) => {
    return await state.server.ws.send(`/play_fen "${state.board.shortFen}"`);
  }

  static accept = async (state, hash) => {
    return await state.server.ws.send(`/accept ${hash}`);
  }

  static legalSqs = async (state, sq) => {
    return await state.server.ws.send(`/legal_sqs ${sq}`);
  }

  static heuristics = async (state) => {
    return await state.server.ws.send(`/heuristics`);
  }

  static heuristicsBar = async (state, fen) => {
    return await state.server.ws.send(`/heuristics_bar "${fen}"`);
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
