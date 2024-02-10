import { Pgn } from '@chesslablab/reactblab';
import * as modeConst from 'features/mode/modeConst';

const wsMiddleware = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  
  const { type } = action;

  const stateActiveMode = Object.values(getState()).find((val, key) => val.active);

  switch (type) {
    case 'ws/connect':
      return socket.connect(dispatch, getState);

    case 'ws/start':
      let msg = `/start ${action.payload.variant} ${action.payload.mode}`;
      if (Object.keys(action.payload.settings).length > 0) {
        if (action.payload.mode === modeConst.FEN) {
          msg += ` ${JSON.stringify(action.payload.settings)}`;
        } else if (action.payload.mode === modeConst.SAN) {
          msg += ` ${JSON.stringify(action.payload.settings)}`;
        } else if (action.payload.mode === modeConst.PLAY) {
          msg += ` ${JSON.stringify(action.payload.settings)}`;
        } else if (action.payload.mode === modeConst.STOCKFISH) {
          if (action.payload.settings.hasOwnProperty('color')) {
            msg += ` ${action.payload.settings.color}`;
          } else if (action.payload.settings.hasOwnProperty('fen')) {
            msg += ` "${action.payload.settings.fen}"`;
          }
        }
      }
      socket.send(msg);
      break;

    case 'ws/legal':
      socket.send(`/legal ${action.payload}`);
      break;

    case 'ws/play_lan':
      const color = getState().board.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      if (action.payload) {
        socket.send(`/play_lan ${color} ${action.payload}`);
      }
      socket.send(`/play_lan ${color} ${getState().board.lan}`);
      break;

    case 'ws/heuristics':
      if (getState().nav.dialogs.settings.fields.heuristics === 'on') {
        socket.send(`/heuristics "${getState().board.fen[getState().board.fen.length - 1]}" ${stateActiveMode.variant}`);
      }
      break;

    case 'ws/undo':
      socket.send(`/undo`);
      break;

    case 'ws/takeback':
      socket.send(`/takeback ${action.payload}`);
      break;

    case 'ws/stockfish':
      const options = JSON.stringify(getState().stockfishMode.computer.options).replace(/"/g, '\\"');
      const params = JSON.stringify(getState().stockfishMode.computer.params).replace(/"/g, '\\"');
      socket.send(`/stockfish "${options}" "${params}"`);
      break;

    case 'ws/stockfish_eval':
      if (getState().nav.dialogs.settings.fields.eval === 'on') {
        socket.send(`/stockfish_eval "${getState().board.fen[getState().board.fen.length - 1]}" ${stateActiveMode.variant}`);
      }
      break;

    case 'ws/tutor_fen':
      if (getState().nav.dialogs.settings.fields.explanation === 'on') {
        socket.send(`/tutor_fen "${getState().board.fen[getState().board.fen.length - 1]}" ${stateActiveMode.variant}`);
      }
      break;

    case 'ws/accept':
      socket.send(`/accept ${action.payload}`);
      break;

    case 'ws/draw':
      socket.send(`/draw ${action.payload}`);
      break;

    case 'ws/resign':
      socket.send(`/resign ${action.payload}`);
      break;

    case 'ws/rematch':
      socket.send(`/rematch ${action.payload}`);
      break;

    case 'ws/restart':
      socket.send(`/restart ${getState().playMode.play.hash}`);
      break;

    case 'ws/online_games':
      socket.send('/online_games');
      break;

    case 'ws/randomizer':
      socket.send(`/randomizer ${action.payload.color} "${JSON.stringify(action.payload.items).replace(/"/g, '\\"')}"`);
      break;

    default:
      break;
  }

  return next(action);
}

export default wsMiddleware;
