import { Pgn } from '@chesslablab/reactblab';
import * as modeConst from 'features/mode/modeConst';

const socketMiddleware = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type } = action;

  let stateActiveMode;

  switch (type) {
    case 'socket/connect':
      return socket.connect(dispatch, getState);

    case 'socket/start':
      let msg = `/start ${action.payload.variant} ${action.payload.mode}`;
      if (Object.keys(action.payload.settings).length > 0) {
        if (action.payload.mode === modeConst.FEN) {
          msg += ` ${JSON.stringify(action.payload.settings.settings)}`;
        } else if (action.payload.mode === modeConst.SAN) {
          msg += ` ${JSON.stringify(action.payload.settings.settings)}`;
        } else if (action.payload.mode === modeConst.PLAY) {
          msg += ` ${JSON.stringify(action.payload.settings.settings)}`;
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

    case 'socket/legal':
      socket.send(`/legal ${action.payload}`);
      break;

    case 'socket/play_lan':
      const color = getState().board.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      if (action.payload) {
        socket.send(`/play_lan ${color} ${action.payload}`);
      }
      socket.send(`/play_lan ${color} ${getState().board.lan}`);
      break;

    case 'socket/heuristics':
      const active = Object.values(getState()).find((val, key) => val.active);
      if (getState().nav.dialogs.settings.fields.heuristics === 'on') {
        socket.send(`/heuristics "${getState().board.fen[getState().board.fen.length - 1]}" ${active.variant}`);
      }
      break;

    case 'socket/undo':
      socket.send(`/undo`);
      break;

    case 'socket/takeback':
      socket.send(`/takeback ${action.payload}`);
      break;

    case 'socket/stockfish':
      const options = JSON.stringify(getState().stockfishMode.computer.options).replace(/"/g, '\\"');
      const params = JSON.stringify(getState().stockfishMode.computer.params).replace(/"/g, '\\"');
      socket.send(`/stockfish "${options}" "${params}"`);
      break;

    case 'socket/stockfish_eval':
      stateActiveMode = Object.values(getState()).find((val, key) => val.active);
      if (getState().nav.dialogs.settings.fields.eval === 'on') {
        socket.send(`/stockfish_eval "${getState().board.fen[getState().board.fen.length - 1]}" ${stateActiveMode.variant}`);
      }
      break;

    case 'socket/tutor_fen':
      stateActiveMode = Object.values(getState()).find((val, key) => val.active);
      if (getState().nav.dialogs.settings.fields.explanation === 'on') {
        socket.send(`/tutor_fen "${getState().board.fen[getState().board.fen.length - 1]}" ${stateActiveMode.variant}`);
      }
      break;

    case 'socket/accept':
      socket.send(`/accept ${action.payload}`);
      break;

    case 'socket/draw':
      socket.send(`/draw ${action.payload}`);
      break;

    case 'socket/resign':
      socket.send(`/resign ${action.payload}`);
      break;

    case 'socket/rematch':
      socket.send(`/rematch ${action.payload}`);
      break;

    case 'socket/restart':
      socket.send(`/restart ${getState().playMode.play.hash}`);
      break;

    case 'socket/online_games':
      socket.send('/online_games');
      break;

    case 'socket/randomizer':
      socket.send(`/randomizer ${action.payload.color} "${JSON.stringify(action.payload.items).replace(/"/g, '\\"')}"`);
      break;

    default:
      break;
  }

  return next(action);
}

export default socketMiddleware;
