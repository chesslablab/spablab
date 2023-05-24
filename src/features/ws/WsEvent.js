import jwt_decode from "jwt-decode";
import store from 'app/store';
import Pgn from 'common/Pgn';
import MultiAction from 'common/MultiAction';
import Wording from 'common/Wording';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as board from 'features/board/boardSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as gmMode from 'features/mode/gmModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as undefinedMode from 'features/mode/undefinedModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import WsAction from 'features/ws/WsAction';
import * as eventConst from 'features/eventConst';
import * as heuristicsBar from 'features/heuristicsBarSlice';
import * as progressDialog from 'features/progressDialogSlice';

export default class WsEvent {
  static onStartFen = (data) => dispatch => {
    if (data['/start'].fen) {
      MultiAction.resetModes(dispatch);
      dispatch(board.startFen({ fen: data['/start'].fen }));
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(fenMode.set({
          variant: variantConst.CLASSICAL,
          fen: data['/start'].fen,
        }));
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(fenMode.set({
          variant: variantConst.CHESS_960,
          fen: data['/start'].fen,
          startPos: data['/start'].startPos,
        }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(fenMode.set({
          variant: variantConst.CAPABLANCA_80,
          fen: data['/start'].fen,
        }));
      }
      WsAction.heuristicsBar();
    } else {
      dispatch(undefinedMode.reset());
      dispatch(undefinedMode.set());
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartGm = (data) => dispatch => {
    MultiAction.resetModes(dispatch);
    dispatch(gmMode.set({
      variant: variantConst.CLASSICAL,
      gm: {
        color: data['/start'].color,
        movetext: null,
      },
    }));
  }

  static onStartPgn = (data) => dispatch => {
    if (data['/start'].movetext) {
      dispatch(pgnMode.reset());
      dispatch(board.startPgn(data['/start']));
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(pgnMode.set({
          variant: variantConst.CLASSICAL,
        }));
        MultiAction.openingAnalysisBySameMovetext(dispatch, data['/start'].movetext);
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
      WsAction.heuristicsBar();
    } else {
      dispatch(undefinedMode.reset());
      dispatch(undefinedMode.set());
      dispatch(infoAlert.show({
        info: 'Invalid PGN movetext, please try again with a different one.'
      }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    MultiAction.initGui(dispatch);
    if (data['/start'].jwt) {
      const jwtDecoded = jwt_decode(data['/start'].jwt);
      const play = {
        jwt: data['/start'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/start'].hash,
        color: jwtDecoded.color,
        takeback: null,
        draw: null,
        resign: null,
        rematch: null,
        leave: null,
        accepted: false,
        timer: {
          expiry_timestamp: null,
          over: null
        }
      };
      dispatch(playMode.reset());
      if (data['/start'].variant === variantConst.CLASSICAL) {
        dispatch(playMode.set({
          variant: variantConst.CLASSICAL,
          play: play,
        }));
        dispatch(board.startFen({ fen: data['/start'].fen }));
      } else if (data['/start'].variant === variantConst.CHESS_960) {
        dispatch(playMode.set({
          variant: variantConst.CHESS_960,
          fen: data['/start'].fen,
          startPos: data['/start'].startPos,
          play: play,
        }));
        dispatch(board.startChess960({ fen: data['/start'].fen }));
      } else if (data['/start'].variant === variantConst.CAPABLANCA_80) {
        dispatch(playMode.set({
          variant: variantConst.CAPABLANCA_80,
          play: play,
        }));
        dispatch(board.startCapablanca80({ fen: data['/start'].fen }));
      }
      if (jwtDecoded.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(infoAlert.show({ info: 'Waiting for player to join...' }));
    } else {
      dispatch(playMode.createInviteCodeDialog({ open: false }));
      dispatch(undefinedMode.reset());
      dispatch(undefinedMode.set());
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartStockfishByColor = (data) => dispatch => {
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
      WsAction.stockfish();
    }
  }

  static onStartStockfishByFen = (data) => dispatch => {
    dispatch(board.startFen({ fen: data['/start'].fen }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
    WsAction.heuristicsBar();
  }

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
      if (data['/start'].fen) {
        dispatch(WsEvent.onStartStockfishByFen(data));
      } else {
        dispatch(WsEvent.onStartStockfishByColor(data));
      }
    }
  }

  static onAccept = (data) => dispatch => {
    MultiAction.initGui(dispatch);
    if (data['/accept'].jwt) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      const play = {
        jwt: data['/accept'].jwt,
        jwt_decoded: jwt_decode(data['/accept'].jwt),
        hash: data['/accept'].hash,
        color: jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE,
        takeback: null,
        draw: null,
        resign: null,
        rematch: null,
        leave: null,
        accepted: false,
        timer: {
          expiry_timestamp: null,
          over: null
        },
      };
      dispatch(playMode.reset());
      if (jwtDecoded.variant === variantConst.CLASSICAL) {
        dispatch(playMode.set({
          variant: variantConst.CLASSICAL,
          play: play,
        }));
        dispatch(board.startFen({ fen: jwtDecoded.fen }));
      } else if (jwtDecoded.variant === variantConst.CHESS_960) {
        dispatch(playMode.set({
          variant: variantConst.CHESS_960,
          fen: jwtDecoded.fen,
          startPos: jwtDecoded.startPos,
          play: play,
        }));
        dispatch(board.startChess960({ fen: jwtDecoded.fen }));
      } else if (jwtDecoded.variant === variantConst.CAPABLANCA_80) {
        dispatch(playMode.set({
          variant: variantConst.CAPABLANCA_80,
          play: play,
        }));
        dispatch(board.startCapablanca80({ fen: jwtDecoded.fen }));
      }
      if (store.getState().playMode.play.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(playMode.acceptPlay());
      dispatch(playMode.playOnlineDialog({ open: false }));
    } else {
      dispatch(undefinedMode.reset());
      dispatch(undefinedMode.set());
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
        MultiAction.openingAnalysisByMovetext(dispatch, data['/play_lan'].movetext);
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
        WsAction.stockfish();
      }
      WsAction.heuristicsBar();
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
    dispatch(heuristicsBar.updateBar({
      dimensions: data['/heuristics_bar'].dimensions,
      balance: data['/heuristics_bar'].balance
    }));
  }

  static onTakebackPropose = () => dispatch => {
    if (!store.getState().playMode.play.takeback) {
      dispatch(playMode.acceptTakebackDialog({ open: false }));
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch(playMode.acceptTakebackDialog({ open: true }));
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
      MultiAction.openingAnalysisByMovetext(dispatch, data['/undo'].movetext);
      WsAction.heuristicsBar();
    }
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
    dispatch(playMode.reset());
    dispatch(playMode.set({
      color: store.getState().playMode.play.color,
      accepted: false
    }));
    dispatch(playMode.set({
      jwt: data['/restart'].jwt,
      jwt_decoded: jwtDecoded,
      hash: data['/restart'].hash,
      color: store.getState().playMode.play.color,
      takeback: null,
      draw: null,
      resign: null,
      rematch: null,
      accepted: true,
      timer: {
        expiry_timestamp: expiryTimestamp,
        over: null
      }
    }));
    dispatch(board.start());
    if (store.getState().playMode.play.color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
  }

  static onRandomCheckmate = (data) => dispatch => {
    if (data['/randomizer'].fen) {
      dispatch(stockfishMode.set({
        color: data['/randomizer'].turn,
        options: {
          "Skill Level": 20
        },
        params: {
          "depth": 12
        }
      }));
      WsAction.start(
        variantConst.CLASSICAL,
        modeConst.STOCKFISH,
        { fen: data['/randomizer'].fen }
      );
    } else {
      dispatch(undefinedMode.reset());
      dispatch(undefinedMode.set());
      dispatch(infoAlert.show({ info: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.stockfish({
        ...data['/stockfish'],
        piecePlaced: { event: eventConst.ON_STOCKFISH }
      }));
      WsAction.heuristicsBar();
      MultiAction.openingAnalysisByMovetext(dispatch, data['/stockfish'].movetext);
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
      dispatch(undefinedMode.reset());
      dispatch(undefinedMode.set());
      dispatch(infoAlert.show({
        info: 'Whoops! Something went wrong.'
      }));
    }
  }
}
