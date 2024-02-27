import { Pgn } from '@chesslablab/reactblab';
import jwt_decode from 'jwt-decode';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as actionConst from 'features/mode/actionConst';
import * as fenMode from 'features/mode/fenModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as sanMode from 'features/mode/sanModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as heuristics from 'features/heuristicsSlice';
import multiAction from 'features/multiAction';
import * as tutorFen from 'features/tutorFenSlice';

export default class Ws {
  constructor() {
    this.socket = null
  }

  connect(dispatch, getState) {
    dispatch(infoAlert.show({
      msg: 'Establishing connection...',
      button: false
    }));

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${process.env.REACT_APP_WS_SCHEME}://${process.env.REACT_APP_WS_HOST}:${process.env.REACT_APP_WS_PORT}`);
      this.socket.onopen = () => {
        dispatch(infoAlert.close());
        resolve();
      };

      this.socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        const msg = Object.keys(data)[0];
        switch (true) {
          case 'broadcast' === msg:
            dispatch(playMode.playOnlineTable(data['broadcast']['onlineGames']));
            break;

          case 'error' === msg:
            if (data['error']) {
              dispatch(warningAlert.show({
                msg: 'Whoops! Something went wrong.'
              }));
            }
            break;

          case '/start' === msg:
            if (data['/start'].mode === modeConst.FEN) {
              if (data['/start'].fen) {
                dispatch(board.start(data['/start']));
                dispatch(fenMode.set(data['/start']));
              } else {
                dispatch(warningAlert.show({
                  msg: 'Invalid FEN, please try again with a different one.'
                }));
              }
            } else if (data['/start'].mode === modeConst.SAN) {
              if (data['/start'].movetext) {
                dispatch(board.startPgn(data['/start']));
                dispatch(sanMode.set(data['/start']));
                multiAction.openingByMovetext(dispatch, data['/start']);
              } else {
                dispatch(warningAlert.show({
                  msg: 'Invalid SAN movetext, please try again with a different one.'
                }));
              }
            } else if (data['/start'].mode === modeConst.PLAY) {
              if (data['/start'].jwt) {
                dispatch(board.start(data['/start']));
                const jwtDecoded = jwt_decode(data['/start'].jwt);
                let payload = {
                  variant: data['/start'].variant,
                  play: {
                    jwt: data['/start'].jwt,
                    jwt_decoded: jwtDecoded,
                    hash: data['/start'].hash,
                    color: jwtDecoded.color,
                  },
                };
                if (data['/start'].startPos) {
                  payload.play.startPos = data['/start'].startPos;
                }
                dispatch(playMode.set(payload));
                if (jwtDecoded.color === Pgn.symbol.BLACK) {
                  dispatch(board.flip());
                }
                dispatch(infoAlert.show({ msg: 'Waiting for player to join...' }));
              } else {
                dispatch(warningAlert.show({
                  msg: 'Invalid FEN, please try again with a different one.'
                }));
              }
            } else if (data['/start'].mode === modeConst.STOCKFISH) {
              if (data['/start'].fen) {
                dispatch(board.start(data['/start']));
                if (data['/start'].color === Pgn.symbol.BLACK) {
                  dispatch(board.flip());
                }
              } else {
                if (data['/start'].color === Pgn.symbol.BLACK) {
                  dispatch(board.flip());
                  dispatch({ type: 'ws/stockfish' });
                }
              }
            }
            break;

          case '/legal' === msg:
            if (data['/legal']) {
              dispatch(board.legal(data['/legal']));
            }
            break;

          case '/stockfish' === msg:
            if (data['/stockfish']) {
              dispatch(board.stockfish(data['/stockfish']));
              dispatch({ type: 'ws/heuristics' });
              dispatch({ type: 'ws/tutor_fen' });
              multiAction.openingByMovetext(dispatch, data['/stockfish']);
            }
            break;

          case '/tutor_fen' === msg:
            dispatch(tutorFen.set(data['/tutor_fen']));
            break;

          case '/heuristics' === msg:
            dispatch(heuristics.set(data['/heuristics']));
            break;

          case '/play_lan' === msg:
            if (data['/play_lan'].fen) {
              dispatch(board.validMove(data['/play_lan']));
              if (getState().playMode.active) {
                dispatch(playMode.timer(data['/play_lan'].timer));
                if (getState().playMode.play.color === data['/play_lan'].turn) {
                  dispatch(board.playLan());
                }
              } else if (getState().stockfishMode.active) {
                dispatch({ type: 'ws/stockfish' });
              }
              multiAction.openingByMovetext(dispatch, data['/play_lan']);
              dispatch({ type: 'ws/heuristics' });
              dispatch({ type: 'ws/tutor_fen' });
            }
            break;

          case '/undo' === msg:
            if (data['/undo']) {
              dispatch(board.undo(data['/undo']));
              multiAction.openingByMovetext(dispatch, data['/undo']);
              dispatch({ type: 'ws/heuristics' });
              dispatch({ type: 'ws/tutor_fen' });
            }
            break;

          case '/takeback' === msg:
            if (data['/takeback'].action === actionConst.PROPOSE) {
              if (
                getState().playMode.takeback ||
                getState().playMode.takeback ===  actionConst.DECLINE
              ) {
                dispatch(playMode.acceptTakebackDialog({ open: true }));
              }
            } else if (data['/takeback'].action === actionConst.ACCEPT) {
              dispatch(playMode.acceptTakeback());
              dispatch(infoAlert.show({ msg: 'Takeback accepted.' }));
            } else if (data['/takeback'].action === actionConst.DECLINE) {
              dispatch(playMode.declineTakeback());
              dispatch(infoAlert.show({ msg: 'Takeback declined.' }));
            }
            break;

          case '/accept' === msg:
            if (data['/accept'].jwt) {
              const jwtDecoded = jwt_decode(data['/accept'].jwt);
              const inviterColor = getState().playMode.play?.color;
              multiAction.initGui(dispatch);
              dispatch(board.start({
                variant: jwtDecoded.variant,
                fen: jwtDecoded.fen
              }));
              dispatch(playMode.set({
                active: true,
                variant: jwtDecoded.variant,
                accepted: true,
                fen: jwtDecoded.fen,
                startPos: jwtDecoded.startPos,
                timer: data['/accept'].timer,
                play: {
                  jwt: data['/accept'].jwt,
                  jwt_decoded: jwt_decode(data['/accept'].jwt),
                  hash: data['/accept'].hash,
                  color: inviterColor ?? (jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE),
                },
              }));
              if (getState().playMode.play.color === Pgn.symbol.BLACK) {
                dispatch(board.flip());
              }
            } else {
              dispatch(warningAlert.show({
                msg: 'Invalid invite code, please try again with a different one.'
              }));
            }
            break;

          case '/draw' === msg:
            if (data['/draw'].action === actionConst.PROPOSE) {
              if (!getState().playMode.draw) {
                dispatch(playMode.acceptDrawDialog({ open: true }));
              }
            } else if (data['/draw'].action === actionConst.ACCEPT) {
              dispatch(playMode.acceptDraw());
              dispatch(infoAlert.show({ msg: 'Draw offer accepted.' }));
            } else if (data['/draw'].action === actionConst.DECLINE) {
              dispatch(playMode.declineDraw());
              dispatch(infoAlert.show({ msg: 'Draw offer declined.' }));
            }
            break;

          case '/resign' === msg:
            if (data['/resign'].action === actionConst.ACCEPT) {
              dispatch(playMode.acceptResign());
              dispatch(infoAlert.show({ msg: 'Chess game resigned.' }));
            }
            break;

          case '/leave' === msg:
            if (data['/leave'].action === actionConst.ACCEPT) {
              dispatch(playMode.acceptLeave());
              dispatch(infoAlert.show({ msg: 'Your opponent left the game.' }));
            }
            break;

          case '/rematch' === msg:
            if (data['/rematch'].action === actionConst.PROPOSE) {
              if (!getState().playMode.rematch) {
                dispatch(playMode.acceptRematchDialog({ open: true }));
              }
            } else if (data['/rematch'].action === actionConst.ACCEPT) {
              dispatch(playMode.acceptRematch());
              dispatch({ type: 'ws/restart' });
            } else if (data['/rematch'].action === actionConst.DECLINE) {
              dispatch(playMode.declineRematch());
              dispatch(infoAlert.show({ msg: 'Rematch declined.' }));
            }
            break;

          case '/restart' === msg:
            dispatch({
              type: 'ws/accept',
              payload: data['/restart'],
            });
            break;

          case '/online_games' === msg:
            dispatch(playMode.playOnlineDialog({ open: true }));
            dispatch(playMode.playOnlineTable(data['/online_games']));
            break;

          case '/randomizer' === msg:
            if (data['/randomizer'].fen) {
              dispatch(stockfishMode.set({
                variant: variantConst.CLASSICAL,
                computer: {
                  color: data['/randomizer'].turn,
                  options: {
                    "Skill Level": 20
                  },
                  params: {
                    "depth": 12
                  },
                },
              }));
              dispatch({
                type: 'ws/start',
                payload: {
                  variant: variantConst.CLASSICAL,
                  mode: modeConst.STOCKFISH,
                  settings: {
                    fen: data['/randomizer'].fen
                  },
                },
              });
            } else {
              dispatch(warningAlert.show({ msg: 'Whoops! A random chess position could not be loaded.' }));
            }
            break;

          default:
            break;
        }
      };

      this.socket.onclose = (err) => {
        dispatch(warningAlert.show({
          msg: 'The connection has been lost, please reload the page.'
        }));
        reject(err);
      };

      this.socket.onerror = (err) => {
        dispatch(warningAlert.show({
          msg: 'The connection has been lost, please reload the page.'
        }));
        reject(err);
      };
    });
  }

  send(message) {
    if (this.socket) {
      this.socket.send(message)
    }
  }
}
