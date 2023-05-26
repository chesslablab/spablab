import jwt_decode from "jwt-decode";
import store from 'app/store';
import Pgn from 'common/Pgn';
import Wording from 'common/Wording';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as board from 'features/board/boardSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as gmMode from 'features/mode/gmModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import * as eventConst from 'features/eventConst';
import * as heuristicsBar from 'features/heuristicsBarSlice';
import multiAction from 'features/multiAction';
import * as progressDialog from 'features/progressDialogSlice';

export default class WsEvent {
  static onStart = (data) => dispatch => {
    dispatch(progressDialog.close());
    if (data['/start'].mode === modeConst.FEN) {
      dispatch(WsEvent.onStartFen(data));
    } else if (data['/start'].mode === modeConst.GM) {
      dispatch(WsEvent.onStartGm(data));
    } else if (data['/start'].mode === modeConst.PGN) {
      dispatch(WsEvent.onStartPgn(data));
    } else if (data['/start'].mode === modeConst.PLAY) {
      dispatch(WsEvent.onStartPlay(data));
    } else if (data['/start'].mode === modeConst.STOCKFISH) {
      dispatch(WsEvent.onStartStockfish(data));
    }
  }

  static onStartFen = (data) => dispatch => {
    multiAction.initGui(dispatch);
    if (data['/start'].fen) {
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(board.start({
          variant: variantConst.CLASSICAL,
          fen: data['/start'].fen,
        }));
        dispatch(fenMode.set({
          variant: variantConst.CLASSICAL,
          fen: data['/start'].fen,
        }));
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(board.start({
          variant: variantConst.CHESS_960,
          fen: data['/start'].fen,
        }));
        dispatch(fenMode.set({
          variant: variantConst.CHESS_960,
          fen: data['/start'].fen,
          startPos: data['/start'].startPos,
        }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(board.start({
          variant: variantConst.CAPABLANCA_80,
          fen: data['/start'].fen,
        }));
        dispatch(fenMode.set({
          variant: variantConst.CAPABLANCA_80,
          fen: data['/start'].fen,
        }));
      }
    } else {
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartGm = (data) => dispatch => {
    multiAction.initGui(dispatch);
    dispatch(gmMode.set({
      variant: variantConst.CLASSICAL,
      gm: {
        color: data['/start'].color,
        movetext: null,
      },
    }));
  }

  static onStartPgn = (data) => dispatch => {
    multiAction.initGui(dispatch);
    if (data['/start'].movetext) {
      dispatch(board.startPgn(data['/start']));
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(pgnMode.set({
          variant: variantConst.CLASSICAL,
        }));
        multiAction.openingBySameMovetext(dispatch, data['/start'].movetext);
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(pgnMode.set({
          variant: variantConst.CHESS_960,
          startPos: data['/start'].startPos
        }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(pgnMode.set({
          variant: variantConst.CAPABLANCA_80,
        }));
      }
    } else {
      dispatch(infoAlert.show({
        info: 'Invalid PGN movetext, please try again with a different one.'
      }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    if (data['/start'].jwt) {
      const jwtDecoded = jwt_decode(data['/start'].jwt);
      const play = {
        jwt: data['/start'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/start'].hash,
        color: jwtDecoded.color,
      };
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(board.start({
          variant: variantConst.CLASSICAL,
          fen: data['/start'].fen,
        }));
        dispatch(playMode.set({
          variant: variantConst.CLASSICAL,
          play: play,
        }));
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(board.start({
          variant: variantConst.CHESS_960,
          fen: data['/start'].fen,
        }));
        dispatch(playMode.set({
          variant: variantConst.CHESS_960,
          fen: data['/start'].fen,
          startPos: data['/start'].startPos,
          play: play,
        }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(board.start({
          variant: variantConst.CAPABLANCA_80,
          fen: data['/start'].fen,
        }));
        dispatch(playMode.set({
          variant: variantConst.CAPABLANCA_80,
          play: play,
        }));
      }
      if (jwtDecoded.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(infoAlert.show({ info: 'Waiting for player to join...' }));
    } else {
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartStockfish = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(board.start({
        variant: variantConst.CLASSICAL,
        fen: data['/start'].fen,
      }));
      if (data['/start'].color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
    } else {
      if (data['/start'].color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
        Ws.stockfish();
      }
    }
  }

  static onAccept = (data) => dispatch => {
    if (data['/accept'].jwt) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      dispatch(board.start({
        variant: jwtDecoded.variant,
        fen: jwtDecoded.fen
      }));
      if (store.getState().playMode.play) {
        multiAction.initGui(dispatch);
        dispatch(playMode.set({
          variant: jwtDecoded.variant,
          play: {
            jwt: data['/accept'].jwt,
            jwt_decoded: jwt_decode(data['/accept'].jwt),
            hash: data['/accept'].hash,
            color: jwtDecoded.color,
          },
        }));
      } else {
        multiAction.initGui(dispatch);
        dispatch(playMode.set({
          variant: jwtDecoded.variant,
          play: {
            jwt: data['/accept'].jwt,
            jwt_decoded: jwt_decode(data['/accept'].jwt),
            hash: data['/accept'].hash,
            color: jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE,
          },
        }));
      }
      if (store.getState().playMode.play.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(playMode.acceptPlay());
      // dispatch(playMode.playOnlineDialog({ open: false }));
    } else {
      dispatch(infoAlert.show({
        info: 'Invalid invite code, please try again with a different one.'
      }));
    }
  }

  static onLegal = (data) => dispatch => {
    dispatch(board.legal({
      piece: data['/legal'].identity,
      position: data['/legal'].position,
      fen: data['/legal'].fen
    }));
  }

  static onPlayLan = (props, data) => dispatch => {
    if (data['/play_lan'].isLegal) {
      dispatch(board.validMove(data['/play_lan']));
      if (store.getState().playMode.active) {
        if (store.getState().playMode.play.color !== data['/play_lan'].turn) {
          dispatch(board.playLan({
            piecePlaced: { event: eventConst.ON_PLAY_LAN }
          }));
        }
      } else if (
        store.getState().fenMode.active &&
        store.getState().fenMode.variant === variantConst.CLASSICAL
      ) {
        multiAction.openingByMovetext(dispatch, data['/play_lan'].movetext);
      } else if (
        store.getState().gmMode.active &&
        store.getState().fenMode.variant === variantConst.CLASSICAL
      ) {
        dispatch(infoAlert.close());
        dispatch(progressDialog.open());
        fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/grandmaster`, {
          method: 'POST',
          body: JSON.stringify({
            movetext: data['/play_lan'].movetext
          })
        }).then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              const game = data[0];
              dispatch(gmMode.set({
                variant: variantConst.CLASSICAL,
                gm: {
                  color: Pgn.symbol.WHITE,
                  movetext: game.movetext,
                },
              }));
              dispatch(pgnMode.panelTable({
                open: true,
                game: {
                  Event: game.Event,
                  Site: game.Site,
                  Date: game.Date,
                  White: game.White,
                  Black: game.Black,
                  'White ELO': game.WhiteElo,
                  'Black ELO': game.BlackElo,
                  Result: game.Result,
                  ECO: game.ECO
                }
              }));
            });
          } else if (res.status === 204) {
            dispatch(pgnMode.panelTable({ open: false }));
            dispatch(infoAlert.show({
              info: 'This game was not found in the database, please try again with a different one.'
            }));
          }
        })
        .catch(error => {
          dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
        })
        .finally(() => {
          dispatch(progressDialog.close());
        });
      } else if (
        store.getState().stockfishMode.active &&
        store.getState().stockfishMode.variant === variantConst.CLASSICAL
      ) {
        Ws.stockfish();
      }
      Ws.heuristicsBar();
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(nav.heuristicsDialog({
      open: true,
      heuristics: {
        dimensions: data['/heuristics'].dimensions,
        balance: data['/heuristics'].balance,
      },
    }));
  }

  static onHeuristicsBar = (data) => dispatch => {
    dispatch(heuristicsBar.set({
      dimensions: data['/heuristics_bar'].dimensions,
      balance: data['/heuristics_bar'].balance
    }));
  }

  static onTakebackPropose = () => dispatch => {
    if (!store.getState().playMode.play.takeback) {
      dispatch(playMode.acceptTakebackDialog({ open: true }));
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch(playMode.acceptTakebackDialog({ open: false }));
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().playMode.play.draw) {
      dispatch(playMode.acceptDrawDialog({ open: true }));
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(playMode.acceptDraw());
    dispatch(infoAlert.show({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(playMode.declineDraw());
    dispatch(infoAlert.show({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(board.undo(data['/undo']));
    if (data['/undo'].mode === modeConst.PLAY) {
      dispatch(playMode.declineTakeback());
    } else if (data['/undo'].mode === modeConst.FEN) {
      multiAction.openingByMovetext(dispatch, data['/undo'].movetext);
    }
    Ws.heuristicsBar();
  }

  static onResignAccept = () => dispatch => {
    dispatch(playMode.acceptResign());
    dispatch(infoAlert.show({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().playMode.play.rematch) {
      dispatch(playMode.acceptRematchDialog({ open: true }));
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(playMode.acceptRematch());
    dispatch(infoAlert.show({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(playMode.declineRematch());
    dispatch(infoAlert.show({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(playMode.acceptLeave());
    dispatch(infoAlert.show({ info: 'Your opponent left the game.' }));
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch(playMode.set({
      variant: jwtDecoded.variant,
      play: {
        jwt: data['/restart'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/restart'].hash,
        color: store.getState().playMode.play.color,
        accepted: true,
      }
    }));
    dispatch(board.reset());
    if (store.getState().playMode.play.color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
  }

  static onRandomizer = (data) => dispatch => {
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
      Ws.start(
        variantConst.CLASSICAL,
        modeConst.STOCKFISH,
        { fen: data['/randomizer'].fen }
      );
    } else {
      multiAction.initGui(dispatch);
      dispatch(infoAlert.show({ info: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.stockfish({
        ...data['/stockfish'],
        piecePlaced: { event: eventConst.ON_STOCKFISH }
      }));
      Ws.heuristicsBar();
      multiAction.openingByMovetext(dispatch, data['/stockfish'].movetext);
    }
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(playMode.playOnlineDialog({ open: true, rows: data['/online_games'] }));
  }

  static onCorrespondence = (data) => dispatch => {
    dispatch(progressDialog.close());
    if (data['/inbox'].action === 'create') {
      dispatch(WsEvent.onCorrespondenceCreate(data));
    } else if (data['/inbox'].action === 'read') {
      dispatch(WsEvent.onCorrespondenceRead(data));
    } else if (data['/inbox'].action === 'reply') {
      dispatch(WsEvent.onCorrespondenceReply(data));
    }
  }

  static onCorrespondenceCreate = (data) => dispatch => {
    if (data['/inbox'].action === Wording.verb.CREATE.toLowerCase()) {
      if (data['/inbox'].hash) {
        dispatch(nav.createInboxCodeDialog({
          open: true,
          inbox: {
            hash: data['/inbox'].hash,
          },
        }));
      } else {
        dispatch(nav.createInboxCodeDialog({ open: false }));
        dispatch(infoAlert.show({
          info: data['/inbox'].message,
        }));
      }
    }
  }

  static onCorrespondenceRead = (data) => dispatch => {
    if (data['/inbox'].action === Wording.verb.READ.toLowerCase()) {
      if (data['/inbox'].inbox) {
        dispatch(nav.enterInboxCodeDialog({
          open: true,
          inbox: data['/inbox'].inbox,
        }));
      } else {
        dispatch(nav.enterInboxCodeDialog({ open: false }));
        dispatch(infoAlert.show({
          info: data['/inbox'].message,
        }));
      }
    }
  }

  static onCorrespondenceReply = (data) => dispatch => {
    if (data['/inbox'].action === Wording.verb.REPLY.toLowerCase()) {
      dispatch(infoAlert.show({
        info: data['/inbox'].message,
      }));
    }
  }

  static onError = (data) => dispatch => {
    if (data['error']) {
      multiAction.initGui(dispatch);
      dispatch(infoAlert.show({
        info: 'Whoops! Something went wrong.'
      }));
    }
  }
}
