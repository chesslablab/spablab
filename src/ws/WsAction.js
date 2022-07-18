import {
  connEstablished,
  connError
} from '../features/wsSlice';
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
        dispatch(connError());
        reject(err);
      };
      ws.onopen = () => {
        dispatch(connEstablished({ ws: ws }));
        resolve(ws);
      };
    });
  }

  static startAnalysis = async (ws) => {
    return await ws.send('/start analysis');
  }

  static startGm = async (state, color) => {
    return await state.server.ws.send(`/start gm ${color}`);
  }

  static startFen = async (state, string) => {
    return await state.server.ws.send(`/start fen "${string}"`);
  }

  static startPgn = async (state, movetext) => {
    return await state.server.ws.send(`/start pgn "${movetext}"`);
  }

  static startPlay = async (state, settings) => {
    return await state.server.ws.send(`/start play ${JSON.stringify(settings)}`);
  }

  static startStockfish = async (state, color) => {
    return await state.server.ws.send(`/start stockfish ${color}`);
  }

  static onlineGames = async (state) => {
    return await state.server.ws.send('/online_games');
  }

  static playFen = async (state) => {
    return await state.server.ws.send(`/play_fen "${state.board.shortFen}"`);
  }

  static quit = async (state) => {
    return await state.server.ws.send('/quit');
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

  static gm = async (state) => {
    return await state.server.ws.send(`/gm`);
  }

  static randomGame = async (state) => {
    return await state.server.ws.send(`/random_game`);
  }

  static stockfish = async (state) => {
    return await state.server.ws.send(`/stockfish`);
  }
}
