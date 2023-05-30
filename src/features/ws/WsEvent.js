import jwt_decode from "jwt-decode";
import store from 'app/store';
import Pgn from 'common/Pgn';
import Wording from 'common/Wording';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
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
    if (data['/start'].fen) {
      dispatch(board.start(data['/start']));
      dispatch(fenMode.set(data['/start']));
    } else {
      dispatch(warningAlert.show({
        mssg: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartGm = (data) => dispatch => {
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
      dispatch(board.startPgn(data['/start']));
      dispatch(pgnMode.set(data['/start']));
      multiAction.openingByMovetext(dispatch, data['/start']);
    } else {
      dispatch(warningAlert.show({
        mssg: 'Invalid PGN movetext, please try again with a different one.'
      }));
    }
  }

  static onStartPlay = (data) => dispatch => {
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
      dispatch(infoAlert.show({ mssg: 'Waiting for player to join...' }));
    } else {
      dispatch(warningAlert.show({
        mssg: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartStockfish = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(board.start(data['/start']));
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
      const inviterColor = store.getState().playMode.play?.color;
      multiAction.initGui(dispatch);
      dispatch(board.start({
        variant: jwtDecoded.variant,
        fen: jwtDecoded.fen
      }));
      dispatch(playMode.set({
        variant: jwtDecoded.variant,
        fen: jwtDecoded.fen,
        startPos: jwtDecoded.startPos,
        play: {
          jwt: data['/accept'].jwt,
          jwt_decoded: jwt_decode(data['/accept'].jwt),
          hash: data['/accept'].hash,
          color: inviterColor ?? (jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE),
        },
      }));
      if (store.getState().playMode.play.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(playMode.acceptPlay());
    } else {
      dispatch(warningAlert.show({
        mssg: 'Invalid invite code, please try again with a different one.'
      }));
    }
  }

  static onLegal = (data) => dispatch => {
    if (data['/legal']) {
      dispatch(board.legal(data['/legal']));
    }
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
      } else if (store.getState().gmMode.active) {
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
              mssg: 'This game was not found in the database, please try again with a different one.'
            }));
          }
        })
        .catch(error => {
          dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
        })
        .finally(() => {
          dispatch(progressDialog.close());
        });
      } else if (store.getState().stockfishMode.active) {
        Ws.stockfish();
      }
      multiAction.openingByMovetext(dispatch, data['/play_lan']);
      Ws.heuristicsBar();
    }
  }

  static onUndo = (data) => dispatch => {
    if (data['/undo']) {
      dispatch(board.undo(data['/undo']));
      multiAction.openingByMovetext(dispatch, data['/undo']);
      Ws.heuristicsBar();
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(progressDialog.close());
    dispatch(nav.heuristicsDialog({
      open: true,
      heuristics: data['/heuristics'],
    }));
  }

  static onHeuristicsBar = (data) => dispatch => {
    dispatch(heuristicsBar.set(data['/heuristics_bar']));
  }

  static onTakeback = (data) => dispatch => {
    if (data['/takeback'] === Wording.verb.PROPOSE.toLowerCase()) {
      if (!store.getState().playMode.play.takeback) {
        dispatch(playMode.acceptTakebackDialog({ open: true }));
      }
    } else if (data['/takeback'] === Wording.verb.ACCEPT.toLowerCase()) {
      dispatch(playMode.acceptTakebackDialog({ open: false }));
    }
  }

  static onDraw = (data) => dispatch => {
    if (data['/draw'] === Wording.verb.PROPOSE.toLowerCase()) {
      if (!store.getState().playMode.play.draw) {
        dispatch(playMode.acceptDrawDialog({ open: true }));
      }
    } else if (data['/draw'] === Wording.verb.ACCEPT.toLowerCase()) {
      dispatch(playMode.acceptDraw());
      dispatch(infoAlert.show({ mssg: 'Draw offer accepted.' }));
    } else if (data['/draw'] === Wording.verb.DECLINE.toLowerCase()) {
      dispatch(playMode.declineDraw());
      dispatch(infoAlert.show({ mssg: 'Draw offer declined.' }));
    }
  }

  static onResign = (data) => dispatch => {
    if (data['/resign'] === Wording.verb.ACCEPT.toLowerCase()) {
      dispatch(playMode.acceptResign());
      dispatch(infoAlert.show({ mssg: 'Chess game resigned.' }));
    }
  }

  static onRematch = (data) => dispatch => {
    if (data['/rematch'] === Wording.verb.PROPOSE.toLowerCase()) {
      if (!store.getState().playMode.play.rematch) {
        dispatch(playMode.acceptRematchDialog({ open: true }));
      }
    } else if (data['/rematch'] === Wording.verb.ACCEPT.toLowerCase()) {
      dispatch(playMode.acceptRematch());
      dispatch(infoAlert.show({ mssg: 'Rematch accepted.' }));
    } else if (data['/rematch'] === Wording.verb.DECLINE.toLowerCase()) {
      dispatch(playMode.declineRematch());
      dispatch(infoAlert.show({ mssg: 'Rematch declined.' }));
    }
  }

  static onLeave = (data) => dispatch => {
    if (data['/leave'] === Wording.verb.ACCEPT.toLowerCase()) {
      dispatch(playMode.acceptLeave());
      dispatch(infoAlert.show({ mssg: 'Your opponent left the game.' }));
    }
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    dispatch(board.start(jwtDecoded));
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
      dispatch(warningAlert.show({ mssg: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.stockfish({
        ...data['/stockfish'],
        piecePlaced: { event: eventConst.ON_STOCKFISH }
      }));
      Ws.heuristicsBar();
      multiAction.openingByMovetext(dispatch, data['/stockfish']);
    }
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(playMode.playOnlineDialog({ open: true, rows: data['/online_games'] }));
  }

  static onCorrespondence = (data) => dispatch => {
    dispatch(progressDialog.close());
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
          mssg: data['/inbox'].message,
        }));
      }
    } else if (data['/inbox'].action === Wording.verb.READ.toLowerCase()) {
      if (data['/inbox'].inbox) {
        dispatch(nav.enterInboxCodeDialog({
          open: true,
          inbox: data['/inbox'].inbox,
        }));
      } else {
        dispatch(nav.enterInboxCodeDialog({ open: false }));
        dispatch(infoAlert.show({
          mssg: data['/inbox'].message,
        }));
      }
    } else if (data['/inbox'].action === Wording.verb.REPLY.toLowerCase()) {
      dispatch(infoAlert.show({
        mssg: data['/inbox'].message,
      }));
    }
  }

  static onError = (data) => dispatch => {
    if (data['error']) {
      dispatch(warningAlert.show({
        mssg: 'Whoops! Something went wrong.'
      }));
    }
  }
}
